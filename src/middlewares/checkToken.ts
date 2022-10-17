import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { UserWithoutPassword } from "../interfaces/user";

export async function checkToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.headers.authorization)
      throw new Error("no Authorization header found");
    const [bearer, token] = req.headers.authorization.split(" ");

    if (bearer === "Bearer" && token) {
      const decoded = jwt.verify(token, process.env.SECRET as string);
      if (typeof decoded !== "string" && decoded.username) {
        req.user = decoded as UserWithoutPassword;
        return next();
      }
      res.status(401).send("Invalid token");
    }
  } catch (error) {
    next(error);
  }
}
