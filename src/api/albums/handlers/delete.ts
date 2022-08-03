import prisma from "../../../../prisma/client";
import AlbumHandlers from "../interfaces";

const deleteOne: AlbumHandlers["delete"] = async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.album.delete({
      where: {
        id,
      },
    });

    res.status(200).json(`Album with id: ${id} deleted successfully`);
  } catch (error) {
    next(error);
  }
};

export default deleteOne;
