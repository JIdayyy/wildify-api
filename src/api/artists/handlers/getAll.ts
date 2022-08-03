import prisma from "../../../../prisma/client";
import ArtistHandlers from "../interfaces";

const getAll: ArtistHandlers["getAll"] = async (req, res, next) => {
  try {
    const artists = await prisma.artist.findMany();

    res.status(200).json(artists);
  } catch (error) {
    next(error);
  }
};

export default getAll;
