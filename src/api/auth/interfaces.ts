import { RequestHandler } from "express";
import { UserWithoutPassword } from "../../interfaces/user";
import { ILoginBody, IRegisterBody } from "../../interfaces/body";

export default interface AuthHandlers {
  login: RequestHandler<Record<string, never>, UserWithoutPassword, ILoginBody>;
  register: RequestHandler<
    Record<string, never>,
    UserWithoutPassword,
    IRegisterBody
  >;
  me: RequestHandler<Record<string, never>, UserWithoutPassword, undefined>;
}
