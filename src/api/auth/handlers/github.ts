import { Request, Response } from "express";
import passport from "passport";

const github = (req: Request, res: Response) =>
  passport.authenticate("github2", {
    scope: ["profile", "email"],
    state: req.headers.referer,
  })(req, res);

export default github;
