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

    return res.status(200).json({ message: "Album deleted", id });
  } catch (error) {
    next(error);
  }
};

export default deleteOne;
