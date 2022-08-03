import prisma from "../../../../prisma/client";
import ArtistHandlers from "../interfaces";

const getOne: ArtistHandlers["getOne"] = async (req, res, next) => {
  const { id } = req.params;
  try {
    const artist = await prisma.artist.findUnique({
      where: {
        id,
      },
    });

    res.status(200).json(artist);
  } catch (error) {
    next(error);
  }
};

export default getOne;
