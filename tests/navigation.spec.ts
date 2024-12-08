import { expect } from '@playwright/test';
import { test } from '../fixtures/fixture';
import { TEST_TAG } from '../playwright.config';
import { waitForStableHtml } from '../utils/web.utils';
import { time } from 'console';

test.describe('Header navigation as a guest', () => {
  test.beforeEach(async ({ confirmCookies }) => {
    await confirmCookies.goto();
  });

  test(
    'should navigate to all pages in the header',
    { tag: [TEST_TAG.smoke, TEST_TAG.regression] },
    async ({ page, baseURL, homePage }) => {
      const links = await homePage.header.getHeaderLinks();

      for (const link of links) {
        const href = await link.getAttribute('href');

        await test.step(`Navigating to ${href}`, async () => {
          await link.click();
          await waitForStableHtml(page);

          if (href) {
            const isExternal = href.startsWith('http');

            if (isExternal) {
              expect(page.url()).toBe(href);
              await homePage.goto();
            } else {
              await expect(page).toHaveURL(`${baseURL}${href}`);
            }
          } else {
            throw new Error('href is not defined');
          }
        });
      }
    }
  );
});
