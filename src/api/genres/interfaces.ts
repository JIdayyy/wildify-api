import { Genre } from "@prisma/client";
import { RequestHandler } from "express";

type GenreBodyPost = Omit<Genre, "id" | "artist" | "songs">;

export default interface GenreHandlers {
  getAll: RequestHandler<Record<string, never>, Genre[], null>;
  getOne: RequestHandler<{ id: string }, Genre, null>;
  put: RequestHandler<{ id: string }, Genre, Partial<Genre>>;
  delete: RequestHandler<{ id: string }, { message: string; id: string }, null>;
  post: RequestHandler<Record<string, never>, Genre, GenreBodyPost>;
}
