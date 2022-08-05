import { Song } from "@prisma/client";
import prisma from "../../../../prisma/client";
import SongHandlers from "../interfaces";

const getAll: SongHandlers["getAll"] = async (req, res, next) => {
  try {
    const songs = await prisma.song.findMany({
      include: {
        album: true,
        artist: true,
      },
    });

    res.status(200).json(songs);
  } catch (error) {
    next(error);
  }
};

export default getAll;
