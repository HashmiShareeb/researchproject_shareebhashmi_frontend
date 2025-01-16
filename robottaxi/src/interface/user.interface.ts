export interface User {
  userId: string;
  username: string;
  password: string;
  email: string;
  roles: Role[];
}

type Role = "USER" | "ADMIN" | "OPERATOR"; // --> (Operator can be changed)
