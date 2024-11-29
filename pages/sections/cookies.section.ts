import { Locator, Page } from '@playwright/test';
import { step } from '../../utils/steps.utils';

export class CookiesSection {
  private readonly acceptButton: Locator;
 
  constructor(private page: Page) {
    this.acceptButton = this.page
      .locator('.fc-footer-buttons')
      .getByText('Consent');
  }

  async isCookiesValid(): Promise<boolean> {
    try {
      await this.acceptButton.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  @step('Accept cookies')
  async acceptCookies(): Promise<void> {
    await this.page.waitForLoadState();
    await this.acceptButton.waitFor({ state: 'visible' });
    await this.acceptButton.click();
  }
}
