import { Song } from "@prisma/client";
import { RequestHandler } from "express";

export default interface SongHandlers {
  getAll: RequestHandler<Record<string, never>, Song[], null>;
  getOne: RequestHandler<{ id: string }, Song, null>;
  put: RequestHandler<{ id: string }, Song, Partial<Song>>;
  delete: RequestHandler<{ id: string }, string, null>;
  post: RequestHandler<Record<string, never>, Song, null>;
  getSoundWaveData: RequestHandler<Record<string, never>, number[], null>;
}
