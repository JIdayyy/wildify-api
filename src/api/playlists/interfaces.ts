import { Playlist } from "@prisma/client";
import { RequestHandler } from "express";
import IHandlers from "../../../types/express/handlers";

export default interface PlaylistHandlers extends IHandlers<Playlist> {
  addSongs: RequestHandler<{ id: string }, Playlist, { songIds: string[] }>;
}
