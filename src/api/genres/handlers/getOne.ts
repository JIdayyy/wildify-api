import prisma from "../../../../prisma/client";
import GenreHandlers from "../interfaces";

const getOne: GenreHandlers["getOne"] = async (req, res, next) => {
  const { id } = req.params;
  const { songs } = req.query;

  try {
    const genre = await prisma.genre.findUnique({
      where: {
        id,
      },
      include: {
        songs: songs ? true : false,
      },
    });
    return res.status(200).json(genre);
  } catch (error) {
    next(error);
  }
};

export default getOne;
