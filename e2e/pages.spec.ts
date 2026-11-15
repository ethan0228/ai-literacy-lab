import { expect, test } from '@playwright/test';

const LAB_URL = '/modules/ai-basics/labs/ai-or-not';

test.describe('我的進度', () => {
  test('顯示完成狀態與建議，並可在確認後清除', async ({ page }) => {
    await page.goto('/progress');
    const summary = page.getByTestId('progress-summary');
    await expect(summary).toHaveText('已完成 0 / 12 個實驗');
    await expect(page.getByText('建議接著做：')).toContainText('是 AI，還是固定規則？');

    await page.goto(LAB_URL);
    await page.getByRole('button', { name: '標記為已完成' }).click();
    await expect(page.getByText('已完成！')).toBeVisible();

    await page
      .getByRole('navigation', { name: '主要導覽' })
      .getByRole('link', { name: '我的進度' })
      .click();
    await expect(summary).toHaveText('已完成 1 / 12 個實驗');
    await expect(page.getByText(/✓ 已完成（\d+年\d+月\d+日）/)).toHaveCount(1);
    await expect(page.getByText('建議接著做：')).toContainText('AI 家族地圖');

    await page.getByRole('button', { name: '清除所有進度' }).click();
    await page.getByRole('button', { name: '取消' }).click();
    await expect(summary).toHaveText('已完成 1 / 12 個實驗');

    await page.getByRole('button', { name: '清除所有進度' }).click();
    await page.getByRole('button', { name: '確定清除' }).click();
    await expect(summary).toHaveText('已完成 0 / 12 個實驗');
    await page.reload();
    await expect(summary).toHaveText('已完成 0 / 12 個實驗');
  });
});

test.describe('教師資源與關於', () => {
  test('教師資源列出六個模組與十二個實驗', async ({ page }) => {
    await page.goto('/teachers');
    await expect(page.getByText('全站共 6 個模組、12 個實驗')).toBeVisible();
    await expect(page.getByRole('article')).toHaveCount(6);
    await expect(page.getByRole('rowheader')).toHaveCount(12);
    await expect(page.getByRole('button', { name: '列印這份總覽' })).toBeVisible();

    await page.getByRole('rowheader').getByRole('link', { name: '公平檢查站' }).click();
    await expect(page).toHaveURL('/modules/ai-ethics/labs/fairness-check');
  });

  test('教師資源連結只在教師模式出現在主要導覽', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: '主要導覽' });
    await expect(nav.getByRole('link', { name: '教師資源' })).toHaveCount(0);
    await page.getByRole('button', { name: '教師模式' }).click();
    await nav.getByRole('link', { name: '教師資源' }).click();
    await expect(page).toHaveURL('/teachers');
  });

  test('關於頁說明儲存的資料，並可從頁尾進入', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: '關於本站與隱私說明' }).click();
    await expect(page).toHaveURL('/about');
    for (const key of ['ail:mode:v1', 'ail:projection:v1', 'ail:progress:v1']) {
      await expect(page.getByText(key)).toBeVisible();
    }
  });

  test('網站實際使用的 localStorage 鍵與關於頁的說明一致', async ({ page }) => {
    await page.goto(LAB_URL);
    await page.getByRole('button', { name: '教師模式' }).click();
    await page.getByRole('button', { name: '開啟投影模式' }).click();
    await page.getByRole('button', { name: '結束投影', exact: true }).click();
    await page.goto(LAB_URL);
    await page.getByRole('button', { name: '標記為已完成' }).click();
    await expect(page.getByText('已完成！')).toBeVisible();
    const keys = await page.evaluate(() => Object.keys(window.localStorage).sort());
    expect(keys).toEqual(['ail:mode:v1', 'ail:progress:v1', 'ail:projection:v1']);
  });
});

test.describe('投影模式控制列', () => {
  test('取代頁首，可跳到段落並結束投影', async ({ page }) => {
    await page.goto(LAB_URL);
    await page.getByRole('button', { name: '教師模式' }).click();
    await expect(page.getByRole('region', { name: '投影模式控制列' })).toHaveCount(0);

    await page.getByRole('button', { name: '開啟投影模式' }).click();
    const bar = page.getByRole('region', { name: '投影模式控制列' });
    await expect(bar).toBeVisible();
    await expect(page.getByRole('banner')).toBeHidden();

    await bar.getByRole('link', { name: '挑戰' }).click();
    await expect(page).toHaveURL(/#challenge-heading$/);
    await expect(page.getByRole('heading', { name: '挑戰一下' })).toBeInViewport();

    await bar.getByRole('button', { name: '結束投影', exact: true }).click();
    await expect(bar).toHaveCount(0);
    await expect(page.getByRole('banner')).toBeVisible();
    await expect(page.locator('html')).toHaveAttribute('data-projection', 'false');
  });
});

test.describe('上線前檢核', () => {
  test('回應包含安全標頭', async ({ request }) => {
    const response = await request.get('/');
    const headers = response.headers();
    expect(headers['content-security-policy']).toContain("default-src 'self'");
    expect(headers['content-security-policy']).toContain("frame-ancestors 'self'");
    expect(headers['x-content-type-options']).toBe('nosniff');
    expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin');
    expect(headers['x-powered-by']).toBeUndefined();
  });

  test('瀏覽各頁時沒有主控台錯誤，也不會連線到其他網站', async ({ page, baseURL }) => {
    const problems: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') problems.push(`console: ${message.text()}`);
    });
    page.on('pageerror', (error) => {
      // WebKit 會把「換頁時被取消的預先載入請求」回報為錯誤，這不是網站的問題
      if (error.message.includes('due to access control checks')) return;
      problems.push(`pageerror: ${error.message}`);
    });
    page.on('request', (request) => {
      const url = request.url();
      if (!url.startsWith(baseURL ?? '') && !url.startsWith('data:'))
        problems.push(`external: ${url}`);
    });

    for (const path of [
      '/',
      '/modules',
      '/modules/machine-learning',
      '/progress',
      '/teachers',
      '/about',
      '/modules/machine-learning/labs/train-a-classifier',
      '/modules/generative-ai/labs/randomness-dial',
      '/modules/ai-ethics/labs/fairness-check',
    ]) {
      await page.goto(path);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    }
    await page.getByRole('radio', { name: '依口音分組' }).check();
    expect(problems).toEqual([]);
  });
});
