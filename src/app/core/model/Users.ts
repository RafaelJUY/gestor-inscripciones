export type UserRole = "ADMIN" | "EMPLOYEE";

export interface IUser{
  email: string;
  password: string;
  role: UserRole;
}
