import { expect } from '@playwright/test';
import { test } from '../fixtures/fixture';
import {
  generateBirthdayData,
  generateRandomEmailAddress,
  generateAddressData,
  generatePassword,
  getUserNameFromEmail,
} from '../utils/helper';
import { type IAddressInformation } from '../interfaces/user.interface';
import { Country } from '../enum/country.enum';
import { TEST_TAG } from '../playwright.config';

test.describe('Register', () => {
  test(
    'should register a new user',
    { tag: TEST_TAG.regression },
    async ({ loginPage, signupPage, homePage, confirmCookies }) => {
      const email: string = generateRandomEmailAddress();
      const username = getUserNameFromEmail(email);
      const password: string = generatePassword();
      const birthdate = generateBirthdayData() || {
        day: '01',
        month: '01',
        year: '2000',
      };
      const address: IAddressInformation = generateAddressData(
        Country.NewZealand
      );
      await confirmCookies.goto();
      await loginPage.goto();
      await loginPage.signup(username, email);
      await signupPage.shouldBeAtPage();
      await expect(signupPage.usernameInput).toHaveValue(username);
      await expect(signupPage.usernameInput).toBeEditable();
      await expect(signupPage.emailInput).toHaveValue(email);
      await expect(signupPage.emailInput).not.toBeEditable();

      await signupPage.fillPasswordInput(password);
      await signupPage.selectBirthdateDate(
        birthdate.day,
        birthdate.month,
        birthdate.year
      );
      await signupPage.checkNewsletterCheckbox();
      await signupPage.fillAddressInformation(address);
      await signupPage.clickCreateAccountButton();

      await signupPage.accountCreatedSection.continueButton.waitFor({
        state: 'visible',
      });
      await signupPage.accountCreatedSection.clickContinue();
      expect(await homePage.header.getUsername()).toContain(username);
    }
  );
});
