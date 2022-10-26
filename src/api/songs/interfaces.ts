import { Song } from "@prisma/client";
import { RequestHandler } from "express";
import IHandlers from "../../../types/express/handlers";

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

export default interface SongHandlers extends IHandlers<Song> {
  getSoundWaveData: RequestHandler<Record<string, never>, number[], null>;
  youtubeDownload: RequestHandler<
    Record<string, never>,
    Song,
    YoutubeUploadBody
  >;
}
