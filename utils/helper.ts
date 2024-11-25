import { faker } from '@faker-js/faker';
import { IAddressInformation, User } from '../interfaces/user.interface';
import { Country } from '../enum/country.enum';

type EmailFormat = {
  inboxPrefix?: string;
  domain?: string;
};

export function generateRandomEmailAddress(options?: EmailFormat): User {
  const inboxPrefix = options?.inboxPrefix || 'test_user';
  const domain = options?.domain || 'sharklasers.com';
  const timestamp = Date.now();
  const username: string = `${inboxPrefix}${timestamp}`;
  return { email: `${inboxPrefix}${timestamp}@${domain}`, username };
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
    mobileNumber: faker.phone.number(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    postalCode: faker.location.zipCode(),
    country,
  };
}
