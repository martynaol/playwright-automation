import { LoginPage } from '../pages/login.page';
import { test as base } from '@playwright/test';
import { SignupPage } from '../pages/signup.page';
import { HomePage } from '../pages/homepage.page';

type Fixture = {
  homePage: HomePage;
  loginPage: LoginPage;
  signupPage: SignupPage;
};

export const test = base.extend<Fixture>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  signupPage: async ({ page }, use) => {
    await use(new SignupPage(page));
  },
});
