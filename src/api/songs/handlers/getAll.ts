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
    console.log("admin");
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
    if (query.soundwave) {
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
        },
      });
      return res.status(200).json(songs);
    }

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
      },
    });

    return res.status(200).json(songs);
  } catch (error) {
    next(error);
  }
};

export default getAll;
