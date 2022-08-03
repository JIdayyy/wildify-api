import Express from "express";
import errorHandler from "./middlewares/errorHandler";
import passport from "passport";
import cors from "cors";
import api from "./api";
import bodyParser from "body-parser";

const app = Express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(passport.initialize());

app.use(bodyParser.json());

app.use("/api/v1", api);

app.use(errorHandler);

export default app;
