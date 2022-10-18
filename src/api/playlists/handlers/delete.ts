import prisma from "../../../../prisma/client";
import PlaylistHandlers from "../interfaces";

const deleteOne: PlaylistHandlers["delete"] = async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.playlist.delete({
      where: {
        id,
      },
    });

    res.status(200).json(`Playlist with id: ${id} deleted successfully`);
  } catch (error) {
    next(error);
  }
};

export default deleteOne;
