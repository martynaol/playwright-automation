import { expect } from '@playwright/test';
import { test } from '../fixtures/fixture';
import { TEST_TAG } from '../playwright.config';
import { getUserNameFromEmail } from '../utils/helper';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage, confirmCookies }) => {
    await confirmCookies.goto();
    await loginPage.goto();
  });

  test(
    'should login with valid credentials',
    { tag: [TEST_TAG.regression, TEST_TAG.smoke] },
    async ({ loginPage, user, homePage }) => {
      await loginPage.login(user);
      expect(
        await homePage.header.getUsername(),
        'Username should be displayed in the header after login'
      ).toContain(getUserNameFromEmail(user.email));
    }
  );

  test(
    'should not login user with invalid credentials',
    { tag: TEST_TAG.regression },
    async ({ loginPage }) => {
      await loginPage.login({ email: 'test01@zaq.co', password: 'test123' });
      await loginPage.shouldBeAtPage();
      await expect(
        loginPage.errorMessageText,
        'Error message should displayed'
      ).toBeVisible();
    }
  );
});
