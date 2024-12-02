import { test as base } from '@playwright/test';
import { HomePage } from '../pages/homepage.page';
import { LoginPage } from '../pages/login.page';
import { SignupPage } from '../pages/signup.page';
import path from 'path';
import { IUserCredentials } from '../interfaces/user.interface';
import { getUsers } from '../config/users';
import fs from 'fs';

type Fixture = {
  homePage: HomePage;
  loginPage: LoginPage;
  signupPage: SignupPage;
};
let workerUser: IUserCredentials;

export const authTest = base.extend<Fixture, { workerStorageState: string }>({
  storageState: ({ workerStorageState }, use) => {
    use(workerStorageState);
  },
  workerStorageState: [
    async ({ browser }, use) => {
      const id = authTest.info().parallelIndex;
      const fileName = path.resolve(`.auth/authState${id}.json`);
      const user: IUserCredentials = getUsers()[id];

      workerUser = user;
      console.log(
        `Worker ${id} is running test ${authTest.info().title} with user ${user.email}`
      );

      if (+authTest.info().retry === 0 && fs.existsSync(fileName)) {
        // Reuse existing authentication state if any.
        console.log(
          `Reusing storage state from ${fileName} for test ${authTest.info().title}`
        );
        await use(fileName);
        return;
      } else {
        console.log(`Retry status is ${authTest.info().retry}`);
        console.log(`No storage state found for test ${authTest.info().title}`);
      }

      // Authenticate user
      const page = await browser.newPage({ storageState: undefined });
      const loginPage: LoginPage = new LoginPage(page);

      await loginPage.goto();

      if (await loginPage.cookies.isCookiesValid()) {
        await loginPage.cookies.acceptCookies();
      }

      await loginPage.login(user);
      await new HomePage(page).shouldBeAtPage();

      await page.context().storageState({ path: fileName });
      await page.close();
      await use(fileName);
    },
    { scope: 'worker' },
  ],
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
