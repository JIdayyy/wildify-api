import { RequestHandler } from "express";

export interface SearchHandler {
  search: RequestHandler<any, any, any, any, any>;
}
