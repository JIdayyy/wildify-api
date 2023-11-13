import prisma from "../../../../prisma/client";
import PlaylistHandlers from "../interfaces";

const removeSongs: PlaylistHandlers["removeSongs"] = async (req, res, next) => {
  const { songIds } = req.body;
  const { id } = req.params;

  try {
    const playlist = await prisma.playlist.update({
      where: {
        id,
      },
      data: {
        songs: {
          disconnect: songIds.map((songId) => ({ id: songId })),
        },
      },
      include: {
        songs: true,
      },
    });

    res.status(200).json(playlist);
  } catch (error) {
    next(error);
  }
};

export default removeSongs;
