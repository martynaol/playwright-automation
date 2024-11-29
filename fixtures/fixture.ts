import { LoginPage } from '../pages/login.page';
import { test as base } from '@playwright/test';
import { SignupPage } from '../pages/signup.page';
import { HomePage } from '../pages/homepage.page';
import { getUsers } from '../config/users';
import { IUserCredentials } from '../interfaces/user.interface';

type Fixture = {
  confirmCookies: HomePage;
  homePage: HomePage;
  loginPage: LoginPage;
  signupPage: SignupPage;
  user: IUserCredentials;
};

export const test = base.extend<Fixture>({
  confirmCookies: async ({ homePage }, use) => {
    await homePage.goto();
    if (await homePage.cookies.isCookiesValid()) {
      await homePage.cookies.acceptCookies();
    }
    await use(homePage);
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  signupPage: async ({ page }, use) => {
    await use(new SignupPage(page));
  },
  user: async ({}, use) => {
    const index = test.info().parallelIndex;
    const users = getUsers();
    const user = users.at(index);

    if (user !== undefined) {
      await use(user);
    } else {
      throw new Error(`User at index ${index} is undefined`);
    }
  },
});
