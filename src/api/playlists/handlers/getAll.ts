import prisma from "../../../../prisma/client";
import PlaylistHandlers from "../interfaces";

const getAll: PlaylistHandlers["getAll"] = async (req, res, next) => {
  const { songs } = req.query;
  try {
    const playlists = await prisma.playlist.findMany({
      include: {
        songs:
          songs === "true"
            ? {
                include: {
                  album: true,
                  artist: true,
                  soundWave: true,
                  genre: true,
                },
              }
            : false,
      },
    });

    res.status(200).json(playlists);
  } catch (error) {
    next(error);
  }
};

export default getAll;
