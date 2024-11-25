import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { getPath } from '../config/routes';
import { IAddressInformation } from '../interfaces/user.interface';
import { AccountCreatedSection } from './sections/account.created.section';
import { step } from '../utils/steps.utils';

export class SignupPage extends BasePage {
  readonly accountCreatedSection: AccountCreatedSection;
  readonly usernameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly birthdateDaySelector: Locator;
  readonly birthdateMonthSelector: Locator;
  readonly birthdateYearSelector: Locator;
  readonly newsletterCheckbox: Locator;
  readonly specialOffersCheckbox: Locator;
  readonly firstnameInput: Locator;
  readonly lastnameInput: Locator;
  readonly companyInput: Locator;
  readonly address1Input: Locator;
  readonly address2Input: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly zipInput: Locator;
  readonly countrySelector: Locator;
  readonly mobilePhoneInput: Locator;
  readonly createAccountButton: Locator;

  constructor(page: Page) {
    super(page, getPath('signup'));
    this.accountCreatedSection = new AccountCreatedSection(page);
    this.usernameInput = this.page.getByTestId('name');
    this.emailInput = this.page.getByTestId('email');
    this.passwordInput = this.page.getByTestId('password');
    this.birthdateDaySelector = this.page.getByTestId('days');
    this.birthdateMonthSelector = this.page.getByTestId('months');
    this.birthdateYearSelector = this.page.getByTestId('years');
    this.newsletterCheckbox = this.page.locator(
      'input[type="checkbox"][name="newsletter"]'
    );
    this.specialOffersCheckbox = this.page.locator(
      'input[type="checkbox"][name="optin"]'
    );

    this.firstnameInput = this.page.getByTestId('first_name');
    this.lastnameInput = this.page.getByTestId('last_name');
    this.companyInput = this.page.getByTestId('company');
    this.address1Input = this.page.getByTestId('address');
    this.address2Input = this.page.getByTestId('address2');
    this.cityInput = this.page.getByTestId('city');
    this.stateInput = this.page.getByTestId('state');
    this.zipInput = this.page.getByTestId('zipcode');
    this.countrySelector = this.page.getByTestId('country');
    this.mobilePhoneInput = this.page.getByTestId('mobile_number');
    this.createAccountButton = this.page.getByTestId('create-account');
  }

  @step('Fill password {password}')
  async fillPasswordInput(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }
  @step('Select birthdate {day} {month} {year}')
  async selectBirthdateDate(
    day: string,
    month: string,
    year: string
  ): Promise<void> {
    await this.birthdateDaySelector.selectOption({ value: day });
    await this.birthdateMonthSelector.selectOption({ value: month });
    await this.birthdateYearSelector.selectOption({ value: year });
  }

  @step('Check newsletter checkbox')
  async checkNewsletterCheckbox(): Promise<void> {
    await this.newsletterCheckbox.check();
  }

  @step('Check special offers checkbox')
  async checkSpecialOffersCheckbox(): Promise<void> {
    await this.specialOffersCheckbox.check();
  }

  @step('Fill address information')
  async fillAddressInformation(data: IAddressInformation) {
    if (data.companyName) await this.companyInput.fill(data.companyName);
    await this.firstnameInput.fill(data.firstname);
    await this.lastnameInput.fill(data.lastname);
    await this.address1Input.fill(data.address);
    await this.address2Input.fill(data.address);
    await this.cityInput.fill(data.city);
    await this.stateInput.fill(data.state);
    await this.zipInput.fill(data.postalCode);
    await this.countrySelector.selectOption({ value: data.country });
    await this.mobilePhoneInput.fill(data.mobileNumber);
  }
  @step('Click on create account button')
  async clickCreateAccountButton(): Promise<void> {
    await this.createAccountButton.click();
  }

  @step('Signup with password {password}')
  async signupNewUser(
    password: string,
    data: IAddressInformation,
    newsletterCheckbox?: boolean,
    specialOffersCheckbox?: boolean
  ): Promise<void> {
    await this.fillPasswordInput(password);
    if (newsletterCheckbox) await this.checkNewsletterCheckbox();
    if (specialOffersCheckbox) await this.checkSpecialOffersCheckbox();

    await this.fillAddressInformation(data);
    await this.clickCreateAccountButton();
  }
}
