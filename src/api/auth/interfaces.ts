import { RequestHandler } from "express";
import { UserWithoutPassword } from "../../interfaces/user";

export interface ILoginBody {
  password: string;
  email: string;
}

export interface IRegisterBody {
  password: string;
  email: string;
  username: string;
}

export default interface AuthHandlers {
  login: RequestHandler<Record<string, never>, UserWithoutPassword, ILoginBody>;
  register: RequestHandler<
    Record<string, never>,
    ILoginResponse,
    IRegisterBody
  >;
  me: RequestHandler<Record<string, never>, UserWithoutPassword, undefined>;
}
