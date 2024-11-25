import { expect } from '@playwright/test';
import { test } from '../fixtures/fixture';
import {
  generateBirthdayData,
  generateRandomEmailAddress,
  generateAddressData,
  generatePassword,
} from '../utils/helper';
import { IAddressInformation, User } from '../interfaces/user.interface';
import { Country } from '../enum/country.enum';
import { TEST_TAG } from '../playwright.config';

test.describe('Register', () => {
  test(
    'Register a new user',
    { tag: TEST_TAG.regression },
    async ({ loginPage, signupPage, homePage }) => {
      const user: User = generateRandomEmailAddress();
      const password: string = generatePassword();
      const birthdate = generateBirthdayData() || {
        day: '01',
        month: '01',
        year: '2000',
      };
      const address: IAddressInformation = generateAddressData(
        Country.NewZealand
      );

      await loginPage.goto();
      await loginPage.cookies.acceptCookies();
      await loginPage.signup(user.username, user.email);
      await signupPage.shouldBeAtPage();
      await expect(signupPage.usernameInput).toHaveValue(user.username);
      await expect(signupPage.usernameInput).toBeEditable();
      await expect(signupPage.emailInput).toHaveValue(user.email);
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
      expect(await homePage.header.getUsername()).toContain(user.username);
    }
  );
});
