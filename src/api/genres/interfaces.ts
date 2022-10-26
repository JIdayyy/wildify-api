import { Genre } from "@prisma/client";
import { RequestHandler } from "express";
import IHandlers from "../../../types/express/handlers";

export default interface GenreHandlers extends IHandlers<Genre> {}
