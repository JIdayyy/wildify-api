import prisma from "../../../../prisma/client";
import ArtistHandlers from "../interfaces";

const put: ArtistHandlers["put"] = async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const artist = await prisma.artist.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });

    res.status(204).json(artist);
  } catch (error) {
    next(error);
  }
};

export default put;
