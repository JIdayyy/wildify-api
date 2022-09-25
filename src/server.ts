import corsOptions from "./config/corsOptions";
import Express, { NextFunction, Request, Response } from "express";
import errorHandler from "./middlewares/errorHandler";
import passport from "passport";
import cors from "cors";
import api from "./api";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../swagger_output.json";
import setCache from "./middlewares/setCache";

const app = Express();

app.use(cors(corsOptions));

app.use(passport.initialize());

app.use(bodyParser.raw());
app.use(bodyParser.json());

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// now call the new middleware function in your app

// app.use(setCache);

app.use("/api/v1", api);

app.use(errorHandler);

export default app;
