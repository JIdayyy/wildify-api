import { NextFunction, Request, Response } from "express";

const checkRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user.role === role) {
      return next();
    }
    res.status(401).send("Unauthorized");
  };
};

export default checkRole;
