import { expect } from '@playwright/test';
import { test } from '../fixtures/fixture';
import { TEST_TAG } from '../playwright.config';

test.describe('Login', () => {
  test(
    'should login with valid credentials',
    { tag: [TEST_TAG.regression, TEST_TAG.smoke] },
    async ({ loginPage, user }) => {
      await loginPage.goto();
      await loginPage.cookies.acceptCookies();
      await loginPage.login(user.email, user.password);
    }
  );

  test(
    'should not login user with invalid credentials',
    { tag: TEST_TAG.regression },
    async ({ loginPage }) => {
      await loginPage.goto();
      await loginPage.cookies.acceptCookies();
      await loginPage.login('test01@zaq.co', 'test123');
      await loginPage.shouldBeAtPage();
      await expect(loginPage.errorMessageText).toBeVisible();
    }
  );
});
