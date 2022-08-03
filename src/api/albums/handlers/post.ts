import prisma from "../../../../prisma/client";
import AlbumHandlers from "../interfaces";

const post: AlbumHandlers["post"] = async (req, res, next) => {
  const { body } = req;
  try {
    const newAlbum = await prisma.album.create({
      data: {
        ...body,
      },
    });
    return res.status(201).json(newAlbum);
  } catch (error) {
    return next(error);
  }
};

export default post;
