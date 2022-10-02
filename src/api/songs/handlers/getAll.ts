import { Song } from "@prisma/client";
import prisma from "../../../../prisma/client";
import SongHandlers from "../interfaces";

const getAll: SongHandlers["getAll"] = async (req, res, next) => {
  const { query } = req;

  try {
    if (query.soundwave) {
      const songs = await prisma.song.findMany({
        include: {
          album: true,
          artist: true,
          soundWave: true,
        },
      });
      return res.status(200).json(songs);
    }

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
