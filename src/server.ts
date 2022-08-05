import Express from "express";
import errorHandler from "./middlewares/errorHandler";
import passport from "passport";
import cors from "cors";
import api from "./api";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../swagger_output.json";

const app = Express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(passport.initialize());

app.use(bodyParser.raw());
app.use(bodyParser.json());

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/api/v1", api);

app.use(errorHandler);

export default app;
