import prisma from "../../../../prisma/client";
import AlbumHandlers from "../interfaces";

const put: AlbumHandlers["put"] = async (req, res, next) => {
  const { id } = req.params;
  const { artistId, picture, title } = req.body;

  try {
    const album = await prisma.album.update({
      where: {
        id,
      },
      data: {
        artistId,
        picture,
        title,
      },
    });

    res.status(200).json(album);
  } catch (error) {
    next(error);
  }
};

export default put;
