import { Page } from '@playwright/test';
import config from '../playwright.config';

export async function waitForStableHtml(page: Page, timeout?: number) {
  await page.waitForLoadState('domcontentloaded');
  const waitTimeout = timeout || config.use?.actionTimeout || 3000;

  const timeoutPromise = new Promise<void>((_, reject) => {
    setTimeout(() => {
      reject(
        new Error('waitForStableHtml timeout after ' + waitTimeout + 'ms')
      );
    }, waitTimeout);
  });

  const htmlPromise = new Promise<void>(async (resolve) => {
    let lastHtml = '';
    const interval = setInterval(async () => {
      const html = await page.content();
      if (html === lastHtml) {
        clearInterval(interval);
        resolve();
      }
      lastHtml = html;
    }, 100); // Reduced interval check time for more responsiveness
  });

  await Promise.race([timeoutPromise, htmlPromise]);
}

