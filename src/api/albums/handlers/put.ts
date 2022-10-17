import prisma from "../../../../prisma/client";
import AlbumHandlers from "../interfaces";

const put: AlbumHandlers["put"] = async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const album = await prisma.album.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });

    res.status(204).json(album);
  } catch (error) {
    next(error);
  }
};

export default put;
