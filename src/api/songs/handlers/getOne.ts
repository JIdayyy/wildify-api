import prisma from "../../../../prisma/client";
import SongHandlers from "../interfaces";

const getOne: SongHandlers["getOne"] = async (req, res, next) => {
  const { id } = req.params;

  const { user } = req;

  if (!user) {
    throw new Error("User not found");
  }

  try {
    const song = await prisma.song.findUnique({
      where: {
        id,
      },
    });

    res.status(200).json(song);
  } catch (error) {
    next(error);
  }
};

export default getOne;
