export interface User {
  email: string,
  password: string;
}

export interface NewUser {
  firstName: string,
  lastName: string,
  dob: string,
  street: string,
  postalcode: string,
  city: string,
  state: string,
  country: string,
  phone: string,
  email: string,
  password: string;
}

export interface UsersFixture {
  validUser: User,
  invalidUser: User,
  registerUser: NewUser;
}
