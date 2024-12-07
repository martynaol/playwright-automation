import { type ICreateAccount, type IUserCredentials } from '../interfaces/user.interface';
import playwrightConfig from '../playwright.config';
import ApiClient from '../utils/axios.wrapper';
import { step } from '../utils/steps.utils';

export class UserServiceApi {
  private readonly client: ApiClient;

  constructor() {
    this.client = new ApiClient(`${playwrightConfig.use?.baseURL}/api`);
  }

  @step('Create user account')
  async createUserAccount(payload: ICreateAccount): Promise<void> {
    await this.client.post('/createAccount', payload);
  }

  @step('Delete user account {user}')
  async deleteUserAccount(user: IUserCredentials): Promise<void> {
    await this.client.delete(`/deleteAccount`, user);
  }
}
