export type UserRole = "ADMIN" | "EMPLOYEE";

export interface IUser{
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  token: string;
  role: UserRole;
}
