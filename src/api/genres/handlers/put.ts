import prisma from "../../../../prisma/client";
import GenreHandlers from "../interfaces";

const put: GenreHandlers["put"] = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const genre = await prisma.genre.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    res.status(200).json(genre);
  } catch (error) {
    next(error);
  }
};

export default put;
