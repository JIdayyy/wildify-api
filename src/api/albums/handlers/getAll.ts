import prisma from "../../../../prisma/client";
import AlbumHandlers from "../interfaces";

const getAll: AlbumHandlers["getAll"] = async (req, res, next) => {
  try {
    const albums = await prisma.album.findMany();

    res.status(200).json(albums);
  } catch (error) {
    next(error);
  }
};

export default getAll;
