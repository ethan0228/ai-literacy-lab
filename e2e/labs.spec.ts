import { expect, test } from '@playwright/test';

test.describe('AI 家族地圖', () => {
  test('三個類別的分類遊戲可完整玩完', async ({ page }) => {
    await page.goto('/modules/ai-basics/labs/ai-family-map');
    await expect(page.getByRole('note', { name: '教學模型說明' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '手機臉部解鎖' })).toBeVisible();

    await page.getByRole('button', { name: /^辨識/ }).click();
    await expect(page.getByTestId('sort-feedback')).toContainText('答對了');
    await page.getByRole('button', { name: '下一張' }).click();

    await page.getByRole('button', { name: /^生成/ }).click();
    await expect(page.getByTestId('sort-feedback')).toContainText('比較接近「預測」');

    for (let card = 2; card <= 6; card += 1) {
      await page.getByRole('button', { name: card === 6 ? '看結果' : '下一張' }).click();
      if (card < 6) await page.getByRole('button', { name: /^辨識/ }).click();
    }
    await expect(page.getByText('你答對了 2 / 6 張卡片')).toBeVisible();
  });
});

test.describe('訓練你的分類器', () => {
  const URL = '/modules/machine-learning/labs/train-a-classifier';

  test('從空白開始：可用按鈕與點擊圖表加入資料，並可復原與清除', async ({ page }) => {
    await page.goto(URL);
    const result = page.getByTestId('classifier-result');
    await expect(result).toContainText('還沒有資料');

    await page.getByRole('button', { name: '加入這筆狗' }).click();
    await expect(result).toContainText('狗 1 筆、貓 0 筆');
    // 只有狗的資料：所有貓都會被判成狗
    await expect(page.getByTestId('accuracy-cat')).toContainText('答對 0 / 30');
    await expect(page.getByTestId('accuracy-dog')).toContainText('答對 30 / 30');

    await page.getByRole('radio', { name: '貓', exact: true }).check({ force: true });
    await page.getByTestId('plot-area').click({ position: { x: 40, y: 150 } });
    await expect(result).toContainText('狗 1 筆、貓 1 筆');

    await page.getByRole('button', { name: '復原' }).click();
    await expect(result).toContainText('狗 1 筆、貓 0 筆');
    await page.getByRole('button', { name: '全部清除' }).click();
    await expect(result).toContainText('還沒有資料');
  });

  test('載入範例資料後顯示測試結果，改變參考筆數會更新', async ({ page }) => {
    await page.goto(URL);
    await page.getByRole('button', { name: '載入範例資料' }).click();
    const result = page.getByTestId('classifier-result');
    await expect(result).toContainText('狗 12 筆、貓 12 筆');
    await expect(result).toContainText('60 隻測試動物中，模型答對 54 隻');

    await page.getByLabel('模型要參考最近的幾筆資料？').selectOption('1');
    await expect(result).toContainText('模型答對 50 隻');

    await page.getByRole('checkbox', { name: '在圖上顯示測試資料' }).check();
    await expect(page.getByText('空心標記：測試資料')).toBeVisible();
  });

  test('可只用鍵盤加入資料', async ({ page }) => {
    await page.goto(URL);
    await page.getByRole('slider', { name: /體重/ }).focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.getByText('體重：8.5 公斤')).toBeVisible();
    await page.getByRole('button', { name: '加入這筆狗' }).focus();
    await page.keyboard.press('Enter');
    await expect(page.getByTestId('classifier-result')).toContainText('狗 1 筆');
  });
});

test.describe('資料偏了會怎樣？', () => {
  test('貓的資料越少，貓的答對數越低', async ({ page }) => {
    await page.goto('/modules/machine-learning/labs/biased-data');
    const cat = page.getByTestId('accuracy-cat');
    await expect(cat).toContainText('答對 29 / 30');

    await page.getByRole('radio', { name: '貓 4 筆、狗 36 筆' }).check();
    await expect(cat).toContainText('答對 19 / 30');

    await page.getByRole('radio', { name: '貓 2 筆、狗 38 筆' }).check();
    await expect(cat).toContainText('答對 0 / 30');
    await expect(page.getByTestId('accuracy-dog')).toContainText('答對 30 / 30');
    await expect(page.getByTestId('bias-result')).toContainText('貓的資料太少');
  });
});
