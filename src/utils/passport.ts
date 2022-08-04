import dotenv from "dotenv";

dotenv.config();

type DoneFunc = (arg0: null, arg1: any) => void;

import passport from "passport";

const GithubStrategy = require("passport-github").Strategy;

const credentials = {
  clientID: "a701d4aa92ced141ac4e",
  clientSecret: "36357c9fc225ae3fb98782f790ddf960c46ae873",
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
