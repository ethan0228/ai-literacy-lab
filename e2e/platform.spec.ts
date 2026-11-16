import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const LAB_URL = '/modules/ai-basics/labs/ai-or-not';

test.describe('首頁與模組目錄', () => {
  test('首頁顯示六大模組並可進入模組頁', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('動手做實驗');
    await expect(page.getByRole('article')).toHaveCount(6);

    // 首頁的迷你實驗：作答後出現回饋與前往完整實驗的連結
    await page.getByRole('button', { name: '照固定規則執行' }).click();
    await expect(page.getByTestId('try-it-feedback')).toContainText('答對了！');
    await expect(page.getByRole('link', { name: /再玩 5 張/ })).toHaveAttribute(
      'href',
      '/modules/ai-basics/labs/ai-or-not',
    );

    await page.getByRole('link', { name: 'AI 基礎與分類' }).click();
    await expect(page).toHaveURL('/modules/ai-basics');
    await expect(page.getByRole('heading', { level: 1, name: 'AI 基礎與分類' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'AI 家族地圖' })).toBeVisible();
  });

  test('模組目錄頁列出六個模組', async ({ page }) => {
    await page.goto('/');
    await page
      .getByRole('navigation', { name: '主要導覽' })
      .getByRole('link', { name: '學習模組' })
      .click();
    await expect(page).toHaveURL('/modules');
    await expect(page.getByRole('article')).toHaveCount(6);
  });

  test('不存在的實驗與模組回傳 404', async ({ page }) => {
    const planned = await page.goto('/modules/ai-basics/labs/nope');
    expect(planned?.status()).toBe(404);
    await expect(page.getByRole('heading', { name: '找不到這個頁面' })).toBeVisible();
    expect((await page.goto('/modules/nope'))?.status()).toBe(404);
  });
});

test.describe('學生／教師模式', () => {
  test('切換模式會改變首頁內容，重新整理後仍保留', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: '教師模式' }).click();
    await expect(page.getByRole('heading', { level: 1 })).toContainText('帶進你的教室');
    await expect(page.locator('html')).toHaveAttribute('data-mode', 'teacher');

    await page.reload();
    await expect(page.getByRole('heading', { level: 1 })).toContainText('帶進你的教室');
    await expect(page.getByRole('button', { name: '教師模式' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  test('教師指引只在教師模式顯示；投影模式會隱藏備課內容', async ({ page }) => {
    await page.goto(LAB_URL);
    await expect(page.getByRole('heading', { name: '教師教學指引' })).toHaveCount(0);

    await page.getByRole('button', { name: '教師模式' }).click();
    await expect(page.getByRole('heading', { name: '教師教學指引' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '常見迷思' })).toBeVisible();

    await page.getByRole('button', { name: '開啟投影模式' }).click();
    await expect(page.locator('html')).toHaveAttribute('data-projection', 'true');
    await expect(page.getByRole('heading', { name: '常見迷思' })).toBeHidden();

    await page.getByRole('button', { name: '結束投影模式' }).click();
    await expect(page.getByRole('heading', { name: '常見迷思' })).toBeVisible();
  });
});

test.describe('共用實驗模板', () => {
  test('顯示教學模型說明，互動實驗與挑戰題有即時回饋', async ({ page }) => {
    await page.goto(LAB_URL);
    await expect(page.getByRole('note', { name: '教學模型說明' })).toContainText('這是教學模型');

    await expect(page.getByRole('heading', { name: '電子計算機' })).toBeVisible();
    await page.getByRole('button', { name: '照固定規則執行' }).click();
    await expect(page.getByTestId('sort-feedback')).toContainText('答對了');
    await page.getByRole('button', { name: '下一張' }).click();
    await expect(page.getByRole('heading', { name: '垃圾郵件過濾' })).toBeVisible();
    await page.getByRole('button', { name: '照固定規則執行' }).click();
    await expect(page.getByTestId('sort-feedback')).toContainText('再想想');

    await page.getByRole('radio', { name: /從大量資料或範例中學到的規律/ }).check();
    await expect(page.getByTestId('challenge-feedback')).toHaveAttribute('data-correct', 'true');
  });

  test('完整玩完六張卡片會看到結果，並可重玩', async ({ page }) => {
    await page.goto(LAB_URL);
    for (let card = 0; card < 6; card += 1) {
      await page.getByRole('button', { name: '照固定規則執行' }).click();
      await page.getByRole('button', { name: card === 5 ? '看結果' : '下一張' }).click();
    }
    await expect(page.getByText('你答對了 3 / 6 張卡片')).toBeVisible();
    await page.getByRole('button', { name: '再玩一次' }).click();
    await expect(page.getByRole('heading', { name: '電子計算機' })).toBeVisible();
  });

  test('標記完成後，進度儲存在本機並顯示於模組卡片', async ({ page }) => {
    await page.goto(LAB_URL);
    await page.getByRole('button', { name: '標記為已完成' }).click();
    await expect(page.getByText('已完成！')).toBeVisible();

    await page.goto('/modules');
    await expect(
      page.getByRole('article', { name: 'AI 基礎與分類' }).getByText('已完成 1 / 2 個實驗'),
    ).toBeVisible();
  });
});

test.describe('無障礙與響應式', () => {
  for (const path of [
    '/',
    '/modules',
    '/modules/ai-basics',
    '/progress',
    '/teachers',
    '/about',
    LAB_URL,
    '/modules/ai-basics/labs/ai-family-map',
    '/modules/machine-learning/labs/train-a-classifier',
    '/modules/machine-learning/labs/biased-data',
    '/modules/generative-ai/labs/next-word',
    '/modules/generative-ai/labs/randomness-dial',
    '/modules/prompt-design/labs/prompt-builder',
    '/modules/prompt-design/labs/prompt-makeover',
    '/modules/ai-trust/labs/spot-the-error',
    '/modules/ai-trust/labs/source-check',
    '/modules/ai-ethics/labs/dilemma-cards',
    '/modules/ai-ethics/labs/fairness-check',
  ]) {
    test(`${path} 通過 axe 檢查（WCAG 2.1 AA）且無水平捲動`, async ({ page }) => {
      // 關閉轉場動畫，避免 axe 在顏色漸變的中途取樣而誤判對比
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(path);
      await page.getByRole('button', { name: '教師模式' }).click();
      await expect(page.locator('html')).toHaveAttribute('data-mode', 'teacher');
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      expect(results.violations).toEqual([]);

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }

  test('可用鍵盤跳到主要內容', async ({ page, browserName }) => {
    await page.goto('/');
    // Safari（WebKit）預設用 Option+Tab 才會把焦點移到連結上
    await page.keyboard.press(browserName === 'webkit' ? 'Alt+Tab' : 'Tab');
    const skip = page.getByRole('link', { name: '跳到主要內容' });
    await expect(skip).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#main')).toBeFocused();
  });

  test('尊重減少動態效果的系統偏好', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(LAB_URL);
    await page.getByRole('button', { name: '照固定規則執行' }).click();
    const duration = await page
      .getByTestId('sort-feedback')
      .evaluate((element) => getComputedStyle(element).animationDuration);
    expect(parseFloat(duration)).toBeLessThan(0.001);
  });
});
