import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { getPath } from '../config/routes';
import { Cart } from './sections/cart.section';
import { step } from '../utils/steps.utils';

export class CheckoutPage extends BasePage {
  readonly cartTable: Cart;
  readonly orderButton: Locator;

  constructor(page: Page) {
    super(page, getPath('checkout'));
    this.cartTable = new Cart(page);
    this.orderButton = this.page.getByRole('link', { name: 'Place Order' });
  }

  @step('Make order')
  async clickOrderButton(): Promise<void> {
    await this.orderButton.click();
  }
}
