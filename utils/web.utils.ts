import { Page } from '@playwright/test';
import config from '../playwright.config';

export async function waitForStableHtml(page: Page, timeout?: number) {
  page.waitForLoadState();
  const waitTimeout = timeout || config.use?.actionTimeout || 30000;
  const timeoutPromise = page.waitForTimeout(waitTimeout).then(() => {
    throw new Error('waitForStableHtml timeout after ' + waitTimeout + 'ms');
  });
  const htmlPromise = new Promise<void>((resolve) => {
    let lastHtml = '';
    const interval = setInterval(async () => {
      const html = await page.content();
      if (html === lastHtml) {
        clearInterval(interval);
        resolve();
      }
      lastHtml = html;
    }, 100);
  });
  await Promise.race([timeoutPromise, htmlPromise]);
}
