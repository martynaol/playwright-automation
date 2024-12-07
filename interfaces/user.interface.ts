import { type Country } from '../enum/country.enum';

export interface IUserCredentials {
  email: string;
  password: string;
}

export interface IAddressInformation {
  firstname: string;
  lastname: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipcode: string;
  country: Country;
  mobile_number: string;
}

export interface ICreateAccount extends IAddressInformation {
  name: string;
  email: string;
  password: string;
  title?: 'Mr' | 'Mrs' | 'Miss';
  birth_date: string; // Format: 'DD'
  birth_month: string; // Format: 'MM'
  birth_year: string; // Format: 'YYYY'
}
