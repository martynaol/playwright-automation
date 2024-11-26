import { IUserCredentials } from '../interfaces/user.interface';

const Users: IUserCredentials[] = [
  {
    email: 'test_user1732541262917@sharklasers.com',
    password: 'y4kZvRdPStRt5LC',
  },
];

export function getUsers(): IUserCredentials[] {
  return Users;
}
