import { pl } from '@faker-js/faker';
import { expect } from '@playwright/test';
import { Page } from 'playwright';
import playwrightConfig from '../playwright.config';

export abstract class AbstractPage {
  protected page: Page;
  protected path: string;
  readonly baseURL: any;

  constructor(page: Page, path: string) {
    this.page = page;
    this.path = path;
    this.baseURL = playwrightConfig.use?.baseURL;
  }

  async goto(additionalPath?: string): Promise<void> {
    const addPath = additionalPath ? additionalPath : '';
    await this.page.goto(this.baseURL + this.path + addPath);
  }

  async visit(path: string): Promise<void> {
    await this.page.goto(path);
  }

  async shouldBeAtPage(message?: string) {
    await expect(this.page, message).toHaveURL(new RegExp('/.*' + this.path), {
      timeout: 40000,
    });
  }
}
