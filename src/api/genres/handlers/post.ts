import prisma from "../../../../prisma/client";
import GenreHandlers from "../interfaces";

const post: GenreHandlers["post"] = async (req, res, next) => {
  const { name } = req.body;

  try {
    const newGenre = await prisma.genre.create({
      data: { name },
    });
    return res.status(201).json(newGenre);
  } catch (error) {
    return next(error);
  }
};

export default post;
