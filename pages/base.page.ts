import { type Page } from '@playwright/test';
import { AbstractPage } from './abstract.page';
import { CookiesSection } from './sections/cookies.section';
import { Header } from './sections/header.section';
import { Notification } from './sections/notification.section';

export class BasePage extends AbstractPage {
  readonly cookies: CookiesSection;
  readonly header: Header;
  readonly notification: Notification;

  constructor(page: Page, path: string) {
    super(page, path);
    this.cookies = new CookiesSection(page);
    this.header = new Header(page);
    this.notification = new Notification(page);
  }
}
