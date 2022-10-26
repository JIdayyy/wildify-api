import prisma from "../../../../prisma/client";
import GenreHandlers from "../interfaces";

const deleteOne: GenreHandlers["delete"] = async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.genre.delete({
      where: {
        id,
      },
    });

    return res
      .status(200)
      .json({ message: `Genre with id: ${id} deleted successfully` });
  } catch (error) {
    next(error);
  }
};

export default deleteOne;
