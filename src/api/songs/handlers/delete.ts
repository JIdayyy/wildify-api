import prisma from "../../../../prisma/client";
import minioClient from "../../../services/minioClient";
import { slugify } from "../../../utils/songUtils";
import SongHandlers from "../interfaces";

const deleteOne: SongHandlers["delete"] = async (req, res, next) => {
  const { id } = req.params;
  try {
    const file = await prisma.song.delete({
      where: {
        id,
      },
      include: {
        album: true,
        artist: true,
      },
    });

    await minioClient.removeObject(
      "wildify",
      `${slugify(file.artist?.name as string)}/${slugify(
        file.album?.title as string
      )}/${slugify(file.title as string)}`
    );

    res.status(200).json(`Song with id: ${id} deleted successfully`);
  } catch (error) {
    next(error);
  }
};

export default deleteOne;
