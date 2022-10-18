import prisma from "../../../../prisma/client";
import PlaylistHandlers from "../interfaces";

const getOne: PlaylistHandlers["getOne"] = async (req, res, next) => {
  const { id } = req.params;

  try {
    const playlist = await prisma.playlist.findUnique({
      where: {
        id,
      },
    });

    res.status(200).json(playlist);
  } catch (error) {
    next(error);
  }
};

export default getOne;
