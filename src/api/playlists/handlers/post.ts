import prisma from "../../../../prisma/client";
import PlaylistHandlers from "../interfaces";

const post: PlaylistHandlers["post"] = async (req, res, next) => {
  const { description, picture, title, userId } = req.body;
  const { user } = req;

  if (!user) {
    throw new Error("User not found");
  }

  try {
    const newPlaylist = await prisma.playlist.create({
      data: {
        description,
        picture,
        title,
        userId: user.id,
      },
    });
    return res.status(201).json(newPlaylist);
  } catch (error) {
    return next(error);
  }
};

export default post;
