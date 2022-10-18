import prisma from "../../../../prisma/client";
import GenreHandlers from "../interfaces";

const getAll: GenreHandlers["getAll"] = async (req, res, next) => {
  const { songs } = req.query;
  try {
    const genres = await prisma.genre.findMany({
      include: {
        songs: songs ? true : false,
      },
    });

    return res.status(200).json(genres);
  } catch (error) {
    next(error);
  }
};

export default getAll;
