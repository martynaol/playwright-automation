import { faker } from '@faker-js/faker';
import {
  IAddressInformation,
  IUserCredentials,
} from '../interfaces/user.interface';
import { Country } from '../enum/country.enum';

type EmailFormat = {
  inboxPrefix?: string;
  domain?: string;
};

export function generateRandomEmailAddress(options?: EmailFormat): string {
  const inboxPrefix = options?.inboxPrefix || 'test_user';
  const domain = options?.domain || 'sharklasers.com';
  const timestamp = Date.now();
  const username: string = `${inboxPrefix}${timestamp}`;
  return `${username}@${domain}`;
}
export function generatePassword(): string {
  return faker.internet.password();
}

export function generateBirthdayData() {
  const data = faker.date.birthdate().toISOString().slice(0, 10);
  const regex = /^(\d{4})-0?(\d+)-0?(\d+)/;
  const match = data.match(regex);

  if (match) {
    const [, year, month, day] = match;

    return { year, month, day };
  }
}

export function generateAddressData(country: Country): IAddressInformation {
  return {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    mobile_number: faker.phone.number(),
    address1: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipcode: faker.location.zipCode(),
    country,
  };
}

export function generateUserData(): IUserCredentials {
  const email = generateRandomEmailAddress();
  const password = generatePassword();
  return { email, password };
}

export function getUserNameFromEmail(email: string): string {
  return email.split('@')[0];
}

export function generateUserPayload(
  user: IUserCredentials,
  country: Country
): any {
  const birthday = generateBirthdayData();
  const addressData = generateAddressData(country) as IAddressInformation;
  const username = getUserNameFromEmail(user.email);

  return {
    firstname: addressData.firstname,
    lastname: addressData.lastname,
    name: username,
    email: user.email,
    password: user.password,
    birth_date: birthday?.day || '01',
    birth_month: birthday?.month || '05',
    birth_year: birthday?.year || '1990',
    address1: addressData.address1,
    address2: addressData.address2,
    city: addressData.city,
    state: addressData.state,
    zipcode: addressData.zipcode,
    country: addressData.country,
    mobile_number: addressData.mobile_number,
  };
}
