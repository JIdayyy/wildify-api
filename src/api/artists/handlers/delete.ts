import prisma from "../../../../prisma/client";
import ArtistHandlers from "../interfaces";

const deleteOne: ArtistHandlers["delete"] = async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.artist.delete({
      where: {
        id,
      },
    });

    res
      .status(200)
      .json({ message: `Artist with id: ${id} deleted successfully` });
  } catch (error) {
    next(error);
  }
};

export default deleteOne;
