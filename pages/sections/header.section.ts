import { Locator, Page } from '@playwright/test';

export class Header {
  readonly headerLinks: Locator;
  readonly loggedUser: Locator;

  constructor(private page: Page) {
    this.headerLinks = this.page.locator('.nav navbar-nav');
    this.loggedUser = this.page.getByText(' Logged in as ');
  }

  async getUsername(): Promise<string> {
    const text = await this.loggedUser.textContent();

    if (!text) {
      throw new Error('Text not found');
    }
    const match = text.match(/Logged in as (.+)/);
    if (!match) {
      throw new Error('Username not found');
    }

    const username = match[1].trim();
    return username;
  }
}
