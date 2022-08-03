import { NextFunction, Request, Response } from "express";
import { ValidationErrorItem } from "joi";

//      Here is a middleware whose purpose is to catch errors like a bottleneck
//    and sent it to the client.
//    It send a status 500 and the error catched by all the app.
//    Don't forget to send errors here with next(error)

interface Error {
  details: Array<ValidationErrorItem>;
  message: string;
}

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  const status = res.statusCode === 200 ? 500 : res.statusCode;
  // eslint-disable-next-line no-console
  console.error(
    err,
    err.details
      ? err.details.map((detail) => detail.message)
      : "Undefined Error"
  ); // Show error for JOI
  res.status(status).send({
    status: status,
    message: err.message,
    details: err.details ? err.details.map((detail) => detail.message) : "🛠",
  });
}
