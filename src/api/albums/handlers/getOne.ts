import prisma from "../../../../prisma/client";
import AlbumHandlers from "../interfaces";

const getOne: AlbumHandlers["getOne"] = async (req, res, next) => {
  const { id } = req.params;
  try {
    const album = await prisma.album.findUnique({
      where: {
        id,
      },
    });

    res.status(200).json(album);
  } catch (error) {
    next(error);
  }
};

export default getOne;
