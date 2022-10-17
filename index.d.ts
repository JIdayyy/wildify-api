declare module "audio-decode";
declare module "decode-audio-data";
import { UserWithoutPassword } from "./src/interfaces/user";

export interface TokenPayload extends UserWithoutPassword {}

declare global {
  namespace Express {
    // extends the User interface created by PassportJS
    interface User extends TokenPayload {}
  }
}
