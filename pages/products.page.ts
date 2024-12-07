import { type Locator, type Page } from '@playwright/test';
import { getPath } from '../config/routes';
import { BasePage } from './base.page';
import { step } from '../utils/steps.utils';
import { Search } from './sections/search.section';

export class ProductsPage extends BasePage {
  readonly search: Search;
  readonly addToCartButton: Locator;
  readonly productItem: Locator;

  constructor(page: Page) {
    super(page, getPath('products'));
    this.search = new Search(page);
    this.addToCartButton = this.page
      .locator('.btn.btn-default.add-to-cart')
      .first();
    this.productItem = this.page.locator('.single-products');
  }

  @step('Add to cart')
  async clickAddToCart(): Promise<void> {
    await this.addToCartButton.waitFor({ state: 'visible' });
    await this.addToCartButton.click();
  }
}
