import prisma from "../../../../prisma/client";
import AlbumHandlers from "../interfaces";

const post: AlbumHandlers["post"] = async (req, res, next) => {
  const { artistId, picture, title } = req.body;

  try {
    const newAlbum = await prisma.album.create({
      data: {
        artist: {
          connect: {
            id: artistId,
          },
        },
        picture,
        title,
      },
    });
    return res.status(201).json(newAlbum);
  } catch (error) {
    return next(error);
  }
};

export default post;
