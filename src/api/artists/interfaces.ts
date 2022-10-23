import { Artist } from "@prisma/client";
import { RequestHandler } from "express";

type ArtistBodyPost = Omit<Artist, "id" | "songs" | "albums">;

export default interface ArtistHandlers {
  getAll: RequestHandler<Record<string, never>, Artist[], null>;
  getOne: RequestHandler<{ id: string }, Artist, null>;
  put: RequestHandler<{ id: string }, Artist, Partial<Artist>>;
  delete: RequestHandler<{ id: string }, string, null>;
  post: RequestHandler<Record<string, never>, Artist, ArtistBodyPost>;
  pictureUpload: RequestHandler<{ id: string }, Artist, null>;
}
