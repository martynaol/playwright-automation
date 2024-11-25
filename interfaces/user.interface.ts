import { Country } from '../enum/country.enum';

export type User = {
  username: string;
  email: string;
};

export interface IUserCredentials {
  email: string;
  password: string;
}

export interface IAddressInformation {
  firstname: string;
  lastname: string;
  companyName?: string;
  mobileNumber: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: Country;
}
