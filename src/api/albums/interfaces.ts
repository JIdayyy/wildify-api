import { Album } from "@prisma/client";
import { RequestHandler } from "express";

type AlbumBodyPost = Omit<Album, "id" | "artist" | "songs">;

export default interface AlbumHandlers {
  getAll: RequestHandler<Record<string, never>, Album[], null>;
  getOne: RequestHandler<{ id: string }, Album, null>;
  put: RequestHandler<{ id: string }, Album, Partial<Album>>;
  delete: RequestHandler<{ id: string }, { message: string; id: string }, null>;
  post: RequestHandler<Record<string, never>, Album, AlbumBodyPost>;
}
