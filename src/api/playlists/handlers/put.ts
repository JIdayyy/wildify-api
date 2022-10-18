import prisma from "../../../../prisma/client";
import PlaylistHandlers from "../interfaces";

const put: PlaylistHandlers["put"] = async (req, res, next) => {
  const { id } = req.params;
  const { description, picture, title } = req.body;

  try {
    const playlist = await prisma.playlist.update({
      where: {
        id,
      },
      data: {
        description,
        picture,
        title,
      },
    });

    res.status(200).json(playlist);
  } catch (error) {
    next(error);
  }
};

export default put;
