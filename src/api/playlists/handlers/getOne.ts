import prisma from "../../../../prisma/client";
import PlaylistHandlers from "../interfaces";

const getOne: PlaylistHandlers["getOne"] = async (req, res, next) => {
  const { id } = req.params;
  const { songs } = req.query;

  try {
    const playlist = await prisma.playlist.findUnique({
      where: {
        id,
      },
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

    res.status(200).json(playlist);
  } catch (error) {
    next(error);
  }
};

export default getOne;
