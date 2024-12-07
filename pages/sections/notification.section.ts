import { Locator, Page } from '@playwright/test';
import { getPath } from '../../config/routes';
import { step } from '../../utils/steps.utils';

export class Notification {
  readonly successNotificationModal: Locator;
  readonly cartButton: Locator;

  constructor(private page: Page) {
    this.successNotificationModal = this.page.locator('.modal-content');
    this.cartButton = this.successNotificationModal.locator(
      `a[href="${getPath('cart')}"]`
    );
  }

  @step('Open cart page')
  async clickToViewCart():Promise<void>  {
    await this.cartButton.click();
  }
}
