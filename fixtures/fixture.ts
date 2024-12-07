import { LoginPage } from '../pages/login.page';
import { test as base } from '@playwright/test';
import { SignupPage } from '../pages/signup.page';
import { HomePage } from '../pages/homepage.page';
import { getUsers } from '../config/users';
import { type IUserCredentials } from '../interfaces/user.interface';
import playwrightConfig from '../playwright.config';
import { UserServiceApi } from '../api/user.service.api';
import { ProductsPage } from '../pages/products.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { PaymentPage } from '../pages/payment.page';

type Fixture = {
  baseURL: string;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  confirmCookies: HomePage;
  homePage: HomePage;
  loginPage: LoginPage;
  paymentPage: PaymentPage;
  productsPage: ProductsPage;
  signupPage: SignupPage;
  user: IUserCredentials;
  userService: UserServiceApi;
};

export const test = base.extend<Fixture>({
  baseURL: playwrightConfig.use?.baseURL,
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
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
  paymentPage: async ({ page }, use) => {
    await use(new PaymentPage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
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
  userService: async ({}, use) => {
    await use(new UserServiceApi());
  },
});
