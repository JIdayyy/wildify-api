import { Song } from "@prisma/client";
import { RequestHandler } from "express";

export interface YoutubeUploadBody {
  url: string;
  songTitle: string;
  artistName: string;
  albumName: string;
}

export interface SongDeleteResponse {
  message: string;
  id: Song["id"];
}

export default interface SongHandlers {
  getAll: RequestHandler<Record<string, never>, Song[], null>;
  getOne: RequestHandler<{ id: string }, Song, null>;
  put: RequestHandler<{ id: string }, Song, Partial<Song>>;
  delete: RequestHandler<{ id: string }, SongDeleteResponse, null>;
  post: RequestHandler<Record<string, never>, Song, null>;
  getSoundWaveData: RequestHandler<Record<string, never>, number[], null>;
  youtubeDownload: RequestHandler<
    Record<string, never>,
    Song,
    YoutubeUploadBody
  >;
}
