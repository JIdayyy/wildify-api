import { Playlist } from "@prisma/client";
import { RequestHandler } from "express";

type PlaylistBodyPost = Omit<Playlist, "id" | "created_at" | "updated_at">;

export default interface PlaylistHandlers {
  getAll: RequestHandler<Record<string, never>, Playlist[], null>;
  getOne: RequestHandler<{ id: string }, Playlist, null>;
  put: RequestHandler<{ id: string }, Playlist, Partial<Playlist>>;
  delete: RequestHandler<{ id: string }, string, null>;
  post: RequestHandler<Record<string, never>, Playlist, PlaylistBodyPost>;
  addSongs: RequestHandler<{ id: string }, Playlist, { songIds: string[] }>;
}
