import { Artist } from "@prisma/client";
import { RequestHandler } from "express";
import IHandlers from "../../../types/express/handlers";

export default interface ArtistHandlers extends IHandlers<Artist> {
  pictureUpload: RequestHandler<{ id: string }, Artist, null>;
}
