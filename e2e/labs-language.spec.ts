import { expect, test } from '@playwright/test';

test.describe('文字接龍機', () => {
  const URL = '/modules/generative-ai/labs/next-word';

  test('一路選機率最高的詞，會接出範例中的句子', async ({ page }) => {
    await page.goto(URL);
    await expect(page.getByRole('note', { name: '教學模型說明' })).toContainText(
      '並不是大型語言模型的運作方式',
    );
    for (let step = 0; step < 5; step += 1) {
      await page.getByRole('button', { name: '選機率最高的' }).click();
    }
    await expect(page.getByTestId('sentence')).toHaveText('我喜歡吃蘋果。');
    await expect(page.getByTestId('sentence-verdict')).toContainText('在範例句子裡出現過');
  });

  test('自己選詞可以接出範例中沒有的新句子，並可重新開始', async ({ page }) => {
    await page.goto(URL);
    await expect(page.getByRole('button', { name: '選「我」：出現 6 次，43%' })).toBeVisible();
    for (const word of ['我', '喜歡', '吃', '骨頭', '。']) {
      await page.getByRole('button', { name: new RegExp(`^選「${word}」`) }).click();
    }
    await expect(page.getByTestId('sentence-verdict')).toContainText('範例句子裡沒有這一句');
    await expect(page.getByTestId('sentence-verdict')).toContainText('不一定是真的');

    await page.getByRole('button', { name: '重新開始' }).click();
    await expect(page.getByTestId('sentence')).toContainText('還沒有任何詞');

    await page.getByText('看看模型讀過的 14 個範例句子').click();
    await expect(page.getByText('今天天氣很好。')).toBeVisible();
  });
});

test.describe('隨機程度旋鈕', () => {
  test('隨機程度為 0 時句子全部相同，調高後出現變化', async ({ page }) => {
    await page.goto('/modules/generative-ai/labs/randomness-dial');
    const dial = page.getByRole('slider', { name: /隨機程度/ });
    const count = page.getByTestId('distinct-count');

    await dial.fill('0');
    await expect(count).toHaveText('5 句之中有 1 種不同的句子。');
    await expect(page.getByTestId('generated').getByRole('listitem').first()).toHaveText(
      '我喜歡吃蘋果。',
    );
    await expect(page.getByText('完全不隨機')).toBeVisible();
    await page.getByRole('button', { name: '再產生 5 句' }).click();
    await expect(count).toHaveText('5 句之中有 1 種不同的句子。');

    await dial.fill('2');
    await expect(count).not.toHaveText('5 句之中有 1 種不同的句子。');
    await expect(page.getByText('很高：各個詞被選到的機會變得接近')).toBeVisible();
  });
});

test.describe('提示詞積木', () => {
  test('組合提示詞、檢查缺少的資訊並提醒隱私', async ({ page }) => {
    await page.goto('/modules/prompt-design/labs/prompt-builder');
    const review = page.getByTestId('prompt-review');
    await expect(review).toContainText('已包含 0 / 5 種資訊');

    await page.getByRole('checkbox', { name: '任務積木' }).check();
    await expect(page.getByTestId('assembled-prompt')).toContainText('水循環');
    await expect(review).toContainText('已包含 1 / 5 種資訊');
    await expect(review).toContainText('還沒有「背景」');

    for (const kind of ['角色', '背景', '格式', '限制']) {
      await page.getByRole('checkbox', { name: `${kind}積木` }).check();
    }
    await expect(review).toContainText('都說清楚了');

    await page.getByRole('checkbox', { name: '個人資料積木' }).check();
    await expect(page.getByTestId('privacy-warning')).toContainText('不要把自己或別人的個人資料');
    await expect(review).not.toContainText('都說清楚了');

    await page.getByRole('button', { name: '全部拿掉' }).click();
    await expect(review).toContainText('已包含 0 / 5 種資訊');
  });
});

test.describe('提示詞大改造', () => {
  test('比較改寫並在回合間切換', async ({ page }) => {
    await page.goto('/modules/prompt-design/labs/prompt-makeover');
    await expect(page.getByText('事先寫好的，不是 AI 即時產生').first()).toBeVisible();
    const feedback = page.getByTestId('makeover-feedback');

    await page.getByRole('button', { name: /^改寫 1/ }).click();
    await expect(feedback).toHaveAttribute('data-best', 'false');
    await page.getByRole('button', { name: /^改寫 2/ }).click();
    await expect(feedback).toHaveAttribute('data-best', 'true');
    await expect(page.getByText('已找到 1 個最佳改寫')).toBeVisible();

    await page.getByRole('button', { name: '下一回合' }).click();
    await expect(page.getByText('第 2 / 3 回合')).toBeVisible();
    await page.getByRole('button', { name: /^改寫 1/ }).click();
    await expect(feedback).toContainText('並不誠實');

    await page.getByRole('button', { name: '上一回合' }).click();
    await expect(feedback).toHaveAttribute('data-best', 'true');
  });
});
