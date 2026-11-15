import { expect, test } from '@playwright/test';

test.describe('抓錯偵探', () => {
  test('標記句子後查看結果，區分找到、漏掉與查證後正確', async ({ page }) => {
    await page.goto('/modules/ai-trust/labs/spot-the-error');
    await expect(page.getByText('事先寫好，並刻意放入錯誤')).toBeVisible();

    await page.getByRole('button', { name: /月球本身會發光/ }).click();
    await page.getByRole('button', { name: /大約需要 27 天/ }).click();
    await expect(page.getByText('已標記 2 個句子。')).toBeVisible();

    await page.getByRole('button', { name: '查看查證結果' }).click();
    await expect(page.getByTestId('spot-summary')).toHaveText(
      '3 個有問題的句子中，你找到了 1 個。',
    );
    await expect(page.getByTestId('result-glow')).toContainText('找到了');
    await expect(page.getByTestId('result-orbit')).toContainText('多查證不是壞事');
    await expect(page.getByTestId('result-first-person')).toContainText('漏掉了');
    await expect(page.getByTestId('result-first-person')).toContainText('阿姆斯壯');
    await expect(page.getByTestId('result-survey')).toContainText('編造');

    await page.getByRole('button', { name: '再試一次' }).click();
    await expect(page.getByText('已標記 0 個句子。')).toBeVisible();
  });
});

test.describe('來源比一比', () => {
  test('選擇來源後顯示線索說明，並可切換回合', async ({ page }) => {
    await page.goto('/modules/ai-trust/labs/source-check');
    await expect(page.getByText('以下來源都是為了練習而虛構的')).toBeVisible();
    await expect(page.getByText('要小心')).toHaveCount(0);

    await page.getByRole('button', { name: '來源 A 比較可信' }).click();
    await expect(page.getByTestId('source-feedback')).toHaveAttribute('data-correct', 'false');
    await expect(page.getByText('要小心：').first()).toBeVisible();

    await page.getByRole('button', { name: '來源 B 比較可信' }).click();
    await expect(page.getByTestId('source-feedback')).toHaveAttribute('data-correct', 'true');
    await expect(page.getByText('答對 1 回合')).toBeVisible();

    await page.getByRole('button', { name: '下一回合' }).click();
    await expect(page.getByText('第 2 / 3 回合')).toBeVisible();
    await page.getByRole('button', { name: '來源 A 比較可信' }).click();
    await expect(page.getByTestId('source-feedback')).toContainText('回到原始、官方的來源');
  });
});

test.describe('兩難情境卡', () => {
  test('每個選擇同時顯示好處與風險，可切換情境', async ({ page }) => {
    await page.goto('/modules/ai-ethics/labs/dilemma-cards');
    await expect(page.getByText('這些情境沒有標準答案')).toBeVisible();

    await page.getByRole('button', { name: '直接交出去，不特別說明' }).click();
    const impacts = page.getByTestId('dilemma-impacts');
    await expect(impacts.getByRole('heading', { name: '可能的好處' })).toBeVisible();
    await expect(impacts.getByRole('heading', { name: '可能的風險' })).toBeVisible();
    await expect(impacts).toContainText('想一想：');

    await page.getByRole('button', { name: /自己重寫並註明使用方式/ }).click();
    await expect(impacts).toContainText('報告是自己的成果');

    await page.getByRole('button', { name: '下一個情境' }).click();
    await expect(page.getByRole('heading', { name: '全班合照變卡通' })).toBeVisible();
    await page.getByRole('button', { name: '上一個情境' }).click();
    await expect(impacts).toContainText('報告是自己的成果');
  });
});

test.describe('公平檢查站', () => {
  test('分組檢查才發現差距，補充資料後差距縮小', async ({ page }) => {
    await page.goto('/modules/ai-ethics/labs/fairness-check');
    await expect(page.getByTestId('group-overall')).toContainText('200 人中 176 人辨識正確（88%）');
    await expect(page.getByTestId('gap-note')).toContainText('試試看分組檢查');

    await page.getByRole('radio', { name: '依年齡分組' }).check();
    await expect(page.getByTestId('gap-note')).toContainText('看不出明顯的差別');

    await page.getByRole('radio', { name: '依口音分組' }).check();
    await expect(page.getByTestId('group-rare')).toContainText('50 人中 32 人辨識正確（64%）');
    await expect(page.getByTestId('gap-note')).toContainText('相差 32 個百分點');
    await expect(
      page.getByRole('img', { name: '訓練資料中少見的口音：50 人中 32 人辨識正確' }),
    ).toBeVisible();

    await page.getByRole('checkbox', { name: /補充少見口音的訓練資料/ }).check();
    await expect(page.getByTestId('group-rare')).toContainText('（92%）');
    await expect(page.getByTestId('gap-note')).toContainText('只相差 4 個百分點');
  });
});
