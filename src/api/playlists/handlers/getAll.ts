import prisma from "../../../../prisma/client";
import PlaylistHandlers from "../interfaces";

const getAll: PlaylistHandlers["getAll"] = async (req, res, next) => {
  try {
    const playlists = await prisma.playlist.findMany();

    res.status(200).json(playlists);
  } catch (error) {
    next(error);
  }
};

export default getAll;
