import dotenv from "dotenv";

dotenv.config();

type DoneFunc = (arg0: null, arg1: any) => void;

import passport from "passport";

const GithubStrategy = require("passport-github").Strategy;

const credentials = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_SECRET,
  callbackURL: `http://localhost:4000/api/v1/auth/github/cb`,
};

passport.serializeUser((user: any, done: DoneFunc) => {
  done(null, user);
});

passport.deserializeUser((user: any, done: DoneFunc) => {
  done(null, user);
});

passport.use(
  new GithubStrategy(
    credentials,
    async (
      _accessToken: any,
      _refreshToken: any,
      profile: any,
      done: DoneFunc
    ) => {
      done(null, profile);
    }
  )
);

export default passport;
