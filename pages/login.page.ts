import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';
import { getPath } from '../config/routes';
import { step } from '../utils/steps.utils';
import { type IUserCredentials } from '../interfaces/user.interface';

export class LoginPage extends BasePage {
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginSubmitButton: Locator;
  readonly errorMessageText: Locator;
  readonly signupUsernameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupSubmitButton: Locator;

  constructor(page: Page) {
    super(page, getPath('login'));
    this.loginEmailInput = this.page.locator('[data-qa="login-email"]');
    this.loginPasswordInput = this.page.locator('[data-qa="login-password"]');
    this.loginSubmitButton = this.page.locator('[data-qa="login-button"]');
    this.errorMessageText = this.page.getByText(
      'Your email or password is incorrect!'
    );
    this.signupUsernameInput = this.page.getByTestId('signup-name');
    this.signupEmailInput = this.page.getByTestId('signup-email');
    this.signupSubmitButton = this.page.getByTestId('signup-button');
  }

  @step('Fill email {email} for login form')
  async fillLoginEmailInput(email: string): Promise<void> {
    await this.loginEmailInput.fill(email);
  }

  @step('Fill password {password} for login form')
  async fillLoginPasswordInput(password: string): Promise<void> {
    await this.loginPasswordInput.fill(password);
  }
  @step('Click on login submit button')
  async clickLoginSubmitButton(): Promise<void> {
    await this.loginSubmitButton.click();
  }

  @step('Login with email {email} and password {password}')
  async login(user: IUserCredentials): Promise<void> {
    await this.fillLoginEmailInput(user.email);
    await this.fillLoginPasswordInput(user.password);
    await this.clickLoginSubmitButton();
  }

  @step('Fill username {name} for signup form')
  async fillSignupUsernameInput(name: string): Promise<void> {
    await this.signupUsernameInput.fill(name);
  }

  @step('Fill email {email} for signup form')
  async fillSignupEmailInput(email: string): Promise<void> {
    await this.signupEmailInput.fill(email);
  }

  @step('Click on signup submit button')
  async clickSignupSubmitButton(): Promise<void> {
    await this.signupSubmitButton.click();
  }

  @step('Signup with name {name} and email {email}')
  async signup(name: string, email: string): Promise<void> {
    await this.fillSignupUsernameInput(name);
    await this.fillSignupEmailInput(email);
    await this.clickSignupSubmitButton();
  }
}
