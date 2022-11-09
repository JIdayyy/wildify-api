import prisma from "../../../../prisma/client";
import PlaylistHandlers from "../interfaces";

const getOne: PlaylistHandlers["getOne"] = async (req, res, next) => {
  const { id } = req.params;
  const { songs } = req.query;
  console.log(songs);
  try {
    const playlist = await prisma.playlist.findUnique({
      where: {
        id,
      },
      include: {
        songs: songs === "true" ? true : false,
      },
    });

    res.status(200).json(playlist);
  } catch (error) {
    next(error);
  }
};

export default getOne;
