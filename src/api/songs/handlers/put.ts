import prisma from "../../../../prisma/client";
import SongHandlers from "../interfaces";

const put: SongHandlers["put"] = async (req, res, next) => {
  const { id } = req.params;
  const { albumId, artistId, duration, link, title } = req.body;

  try {
    const song = await prisma.song.update({
      where: {
        id,
      },
      data: {
        albumId,
        artistId,
        duration,
        link,
        title,
      },
    });

    res.status(200).json(song);
  } catch (error) {
    next(error);
  }
};

export default put;
