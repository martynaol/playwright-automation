import { type Locator, type Page } from '@playwright/test';
import { step } from 'utils/steps.utils';

export class Header {
  readonly headerLinks: Locator;
  readonly loggedUser: Locator;
  readonly logoutButton: Locator;

  constructor(private page: Page) {
    this.headerLinks = this.page.locator('.nav.navbar-nav li').locator('a');
    this.loggedUser = this.page.getByText(' Logged in as ');
    this.logoutButton = this.page.locator('a[href="/logout"]');
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

  async getHeaderLinks(): Promise<Locator[]> {
    return await this.headerLinks.all();
  }

  @step('Click logout button')
  async clickLogout(): Promise<void> {
    await this.logoutButton.click();
  }
}
