export interface User {
  userId: string;
  username: string;
  email: string;
  password: string;
  roles: Role[];
}

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  OPERATOR = "OPERATOR",
}
