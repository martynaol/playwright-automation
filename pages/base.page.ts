import { Page } from '@playwright/test';
import { AbstractPage } from './abstract.page';
import { CookiesSection } from './sections/cookies.section';
import { Header } from './sections/header.section';

export class BasePage extends AbstractPage {
  readonly cookies: CookiesSection;
  readonly header: Header
  constructor(page: Page, path: string) {
    super(page, path);
    this.cookies = new CookiesSection(page);
    this.header = new Header(page);
  }
}
