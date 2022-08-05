import { RequestHandler } from "express";

interface ILoginBody {
  username: string;
  password: string;
}

interface IRegisterBody {
  username: string;
  password: string;
  secretKey: string;
}

interface ILoginResponse {
  token: string;
  user: {
    username: string;
  };
}

export default interface AuthHandlers {
  login: RequestHandler<Record<string, never>, ILoginResponse, ILoginBody>;
  register: RequestHandler<
    Record<string, never>,
    ILoginResponse,
    IRegisterBody
  >;
}
