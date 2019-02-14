export interface ISignUpData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface IJwtData {
  sessionId: string;
  iss: string;
  iat: string;
  exp: string;
}

export type UserRole = "customer" | "admin";

export interface IUserProfile {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export interface IApplicationUserData {
  readonly id?: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: UserRole;
  active?: boolean;
}
