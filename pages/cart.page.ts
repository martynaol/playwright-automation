import { type Locator, type Page } from '@playwright/test';
import { getPath } from '../config/routes';
import { BasePage } from './base.page';
import { step } from '../utils/steps.utils';
import { Cart } from './sections/cart.section';

export class CartPage extends BasePage {
  readonly cartTable: Cart;
  readonly proceedToCheckoutButton: Locator;

  constructor(page: Page) {
    super(page, getPath('cart'));
    this.cartTable = new Cart(page);
    this.proceedToCheckoutButton = this.page.getByText('Proceed To Checkout');
  }

  @step('Click proceed to checkout')
  async clickProceedToCheckout(): Promise<void> {
    await this.proceedToCheckoutButton.click();
  }
}
