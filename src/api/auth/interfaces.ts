import { RequestHandler } from "express";
import { UserWithoutPassword } from "../../interfaces/user";

export interface ILoginBody {
  username: string;
  password: string;
  email: string;
}

export interface IRegisterBody {
  username: string;
  password: string;
  email: string;
}

export interface ILoginResponse {
  user: UserWithoutPassword;
}

export default interface AuthHandlers {
  login: RequestHandler<Record<string, never>, ILoginResponse, ILoginBody>;
  register: RequestHandler<
    Record<string, never>,
    ILoginResponse,
    IRegisterBody
  >;
}
