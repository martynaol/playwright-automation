import { type Locator, type Page } from '@playwright/test';
import { step } from '../../utils/steps.utils';

export class Search {
  readonly searchInput: Locator;
  readonly searchButton: Locator;

  constructor(private page: Page) {
    this.searchInput = this.page.locator('#search_product');
    this.searchButton = this.page.locator('#submit_search');
  }

  @step('Search {phrase}')
  async searchByPhrase(phrase: string):Promise<void>  {
    await this.searchInput.fill(phrase);
    await this.searchButton.click();
  }
}
