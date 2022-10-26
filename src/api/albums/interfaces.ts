import { Album } from "@prisma/client";
import { RequestHandler } from "express";
import IHandlers from "../../../types/express/handlers";

export default interface AlbumHandlers extends IHandlers<Album> {
  pictureUpload: RequestHandler<{ id: string }, Album, null>;
}
