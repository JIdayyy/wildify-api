import { Song } from "@prisma/client";
import prisma from "../../../../prisma/client";
import SongHandlers from "../interfaces";

const getAll: SongHandlers["getAll"] = async (req, res, next) => {
  const { query } = req;
  const { user } = req;

  if (!user) {
    throw new Error("User not found");
  }
  if (user.role === "ADMIN") {
    const songs = await prisma.song.findMany({
      include: {
        album: true,
        artist: true,
        soundWave: true,
        genre: true,
      },
    });
    return res.status(200).json(songs);
  }

  try {
    const songs = await prisma.song.findMany({
      include: {
        album: true,
        artist: true,
        soundWave: true,
        genre: true,
      },
      where: {
        user: {
          id: user.id,
        },
        genre: {
          name: {
            contains: query.genre as string,
          },
        },
      },
    });

    return res.status(200).json(songs);
  } catch (error) {
    next(error);
  }
};

export default getAll;
