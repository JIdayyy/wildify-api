import prisma from "../../../../prisma/client";
import SongHandlers from "../interfaces";

const put: SongHandlers["put"] = async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const song = await prisma.song.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });

    res.status(200).json(song);
  } catch (error) {
    next(error);
  }
};

export default put;
