import { type Locator, type Page } from '@playwright/test';
import { step } from '../../utils/steps.utils';

export class AccountCreatedSection {
  readonly continueButton: Locator;

  constructor(private page: Page) {
    this.continueButton = this.page.getByTestId('continue-button');
  }

  @step('Click continue button')
  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }
}
