export interface User {
  email: string;
  password: string;
}

export interface UsersFixture {
  validUser: User;
  invalidUser: User;
}
