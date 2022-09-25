import prisma from "../../../../prisma/client";
import AlbumHandlers from "../interfaces";

const getAll: AlbumHandlers["getAll"] = async (req, res, next) => {
  const { query } = req;
  try {
    if (!query.count && !query.album) {
      const albums = await prisma.album.findMany();
      return res.status(200).json(albums);
    }

    const albums = await prisma.album.findMany({
      include: {
        artist: true,
        _count: {
          select: {
            [query.count as string]: true,
          },
        },
      },
    });

    return res.status(200).json(albums);
  } catch (error) {
    next(error);
  }
};

export default getAll;
