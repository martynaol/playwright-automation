import { authTest } from 'fixtures/authenticated.fixture';
import { TEST_TAG } from 'playwright.config';

authTest.describe('Logout', () => {
  authTest(
    'should logout user',
    { tag: [TEST_TAG.smoke, TEST_TAG.regression] },
    async ({ homePage, loginPage }) => {
      await homePage.goto();
      await homePage.header.clickLogout();
      await loginPage.shouldBeAtPage();
    }
  );
});
