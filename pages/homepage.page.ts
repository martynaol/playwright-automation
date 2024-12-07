import { type Page } from '@playwright/test';
import { BasePage } from './base.page';
import { ProductsPage } from './products.page';

export class HomePage extends BasePage {
  readonly productsList: ProductsPage;

  constructor(page: Page) {
    super(page, '/');
    this.productsList = new ProductsPage(page);
  }
}
