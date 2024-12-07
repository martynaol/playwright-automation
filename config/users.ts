import { type IUserCredentials } from '../interfaces/user.interface';

const Users: IUserCredentials[] = [
  {
    email: 'test_user1732541262917@sharklasers.com',
    password: 'y4kZvRdPStRt5LC',
  },
  {
    email: 'test_user1733582186049@sharklasers.com',
    password: 'yI0l3VvzH9wQEEE',
  },
];

export function getUsers(): IUserCredentials[] {
  return Users;
}
