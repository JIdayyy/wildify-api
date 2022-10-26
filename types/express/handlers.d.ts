import { RequestHandler } from "express";

type Body<T> = Omit<T, "id" | "created_at" | "updated_at">;

export default interface IHandlers<T> {
  getAll: RequestHandler<Record<string, never>, T[], null>;
  getOne: RequestHandler<{ id: string }, T, null>;
  put: RequestHandler<{ id: string }, T, Body<T>>;
  delete: RequestHandler<{ id: string }, { message: string }, null>;
  post: RequestHandler<Record<string, never>, T, Body<T>>;
  addSongs: RequestHandler<{ id: string }, T, { songIds: string[] }>;
}
