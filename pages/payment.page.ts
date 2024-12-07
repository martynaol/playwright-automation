import { Locator, Page } from '@playwright/test';
import { step } from '../utils/steps.utils';
import { BasePage } from './base.page';
import { getPath } from '../config/routes';

export class PaymentPage extends BasePage {
  readonly cardHolderInput: Locator;
  readonly cardNumberInput: Locator;
  readonly expiredMonthDateInput: Locator;
  readonly expiredYearDateInput: Locator;
  readonly securityCodeInput: Locator;
  readonly submitButton: Locator;
  readonly downloadInvoiceButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    super(page, getPath('payment'));
    this.cardHolderInput = this.page.getByTestId('name-on-card');
    this.cardNumberInput = this.page.getByTestId('card-number');
    this.securityCodeInput = this.page.getByTestId('cvc');
    this.expiredYearDateInput = this.page.getByTestId('expiry-year');
    this.expiredMonthDateInput = this.page.getByTestId('expiry-month');

    this.submitButton = this.page.getByTestId('pay-button');
    this.successMessage = this.page.getByTestId('order-placed');
    this.downloadInvoiceButton = this.page.getByRole('link', {
      name: 'Download Invoice',
    });
  }
  @step('Fill card info')
  async fillCardInfo(name: string): Promise<void> {
    await this.cardHolderInput.fill(name);
    await this.cardNumberInput.fill('4242424242424242');
    await this.expiredMonthDateInput.fill('05');
    await this.expiredYearDateInput.fill('2035');
    await this.securityCodeInput.fill('311');
  }

  @step('Submit payment')
  async submitPayment(): Promise<void> {
    await this.submitButton.click();
  }
}
