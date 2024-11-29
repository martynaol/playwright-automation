import { expect } from '@playwright/test';
import { test } from '../fixtures/fixture';
import { TEST_TAG } from '../playwright.config';

test.describe('Login', () => {
  test(
    'should login with valid credentials',
    { tag: [TEST_TAG.regression, TEST_TAG.smoke] },
    async ({ loginPage, user, confirmCookies }) => {
      await confirmCookies.goto();
      await loginPage.goto();
      await loginPage.login(user);
    }
  );

  test(
    'should not login user with invalid credentials',
    { tag: TEST_TAG.regression },
    async ({ loginPage, confirmCookies }) => {
      await confirmCookies.goto();
      await loginPage.goto();
      await loginPage.login({ email: 'test01@zaq.co', password: 'test123' });
      await loginPage.shouldBeAtPage();
      await expect(loginPage.errorMessageText).toBeVisible();
    }
  );
});
