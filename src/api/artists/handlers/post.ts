import prisma from "../../../../prisma/client";
import ArtistHandlers from "../interfaces";

const post: ArtistHandlers["post"] = async (req, res, next) => {
  const { body } = req;
  try {
    const newArtist = await prisma.artist.create({
      data: {
        ...body,
      },
    });
    return res.status(201).json(newArtist);
  } catch (error) {
    return next(error);
  }
};

export default post;
