import { type Locator, type Page } from "@playwright/test";

export class Cart {
  readonly productItem: Locator;
  readonly productName: Locator;
  readonly productQuantity: Locator;
  readonly productPrice: Locator;
  readonly productTotal: Locator;
  
  constructor(private page: Page) {
    this.productItem = this.page.locator('.cart_product');
    this.productName = this.page.locator('.cart_description');
    this.productPrice = this.page.locator('.cart_price');
    this.productQuantity = this.page.locator('.cart_quantity');
    this.productTotal = this.page.locator('.cart_total');
  }
  
  async getProductName(): Promise<string | null> {
    return await this.productName.textContent();
  }

  async getProductQuantity(): Promise<string | null> {
    return await this.productQuantity.innerText();
  }
  async getProductTotal(): Promise<string | null> {
    return await this.productTotal.textContent();
  }
}
