import { expect } from '@playwright/test';

import { Country } from '../enum/country.enum';
import { test } from '../fixtures/fixture';
import { ICreateAccount, IUserCredentials } from '../interfaces/user.interface';
import { TEST_TAG } from '../playwright.config';
import { generateUserData, generateUserPayload } from '../utils/helper';
import { waitForStableHtml } from '../utils/web.utils';

test.describe('E2E test', () => {
  let user: IUserCredentials;
  let payload: ICreateAccount;
  const productName = 'Blue Top';
  
  test.beforeEach(async ({ userService }) => {
    user = generateUserData();
    payload = generateUserPayload(user, Country.Australia);
    await userService.createUserAccount(payload);
  });

  test.afterEach(async ({ userService }) => {
    await userService.deleteUserAccount(user);
  });

  test(
    'should successfully purchase the product - Blue Top',
    { tag: TEST_TAG.e2e },
    async ({
      page,
      homePage,
      loginPage,
      productsPage,
      cartPage,
      checkoutPage,
      paymentPage,
    }) => {
      await loginPage.goto();

      await loginPage.login(user);
      await waitForStableHtml(page);
      expect(
        await homePage.header.getUsername(),
        'Username should be displayed in the header after login'
      ).toContain(payload.name);

      await productsPage.goto();
      await productsPage.search.searchByPhrase(productName);
      await waitForStableHtml(page);
      await expect(
        productsPage.productItem,
        'One result from search'
      ).toHaveCount(1);

      await productsPage.clickAddToCart();
      await expect(
        productsPage.notification.successNotificationModal,
        'Notification that product added to cart is displayed'
      ).toBeVisible();

      await productsPage.notification.clickToViewCart();
      await cartPage.shouldBeAtPage();

      expect(
        await cartPage.cartTable.getProductName(),
        'Product name in the cart should match the added product'
      ).toContain(productName);
      await expect(
        cartPage.cartTable.productItem,
        'One product item should be displayed'
      ).toHaveCount(1);
      expect(
        await cartPage.cartTable.getProductQuantity(),
        'Product quantity should be 1'
      ).toBe('1');

      const totalPriceCart = await cartPage.cartTable.getProductTotal();

      await cartPage.clickProceedToCheckout();
      await checkoutPage.shouldBeAtPage();
      await waitForStableHtml(page);

      const totalPriceCheckout = await checkoutPage.cartTable.getProductTotal();
      expect(
        totalPriceCart,
        'Total price in checkout should match total price in cart'
      ).toEqual(totalPriceCheckout);

      await checkoutPage.clickOrderButton();
      await paymentPage.shouldBeAtPage('Should be on payment page');

      await paymentPage.fillCardInfo(payload.firstname);
      await paymentPage.submitPayment();
      await waitForStableHtml(page);
      await expect(
        paymentPage.successMessage,
        'Payment finished with success'
      ).toBeVisible();
      expect(
        paymentPage.downloadInvoiceButton,
        'Purchase completed'
      ).toBeVisible();
    }
  );
});
