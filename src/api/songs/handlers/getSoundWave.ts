import dotenv from "dotenv";
dotenv.config();
import SongHandlers from "../interfaces";
import prisma from "../../../../prisma/client";

const getSoundWave: SongHandlers["getSoundWaveData"] = async (
  req,
  res,
  next
) => {
  const { id } = req.params;
  try {
    const soundWaveData = await prisma.song
      .findUniqueOrThrow({
        where: {
          id,
        },
      })
      .soundWave();

    if (!soundWaveData) {
      throw new Error("No soundwave data for this song");
    }

    return res.status(200).json(JSON.parse(soundWaveData.data) as number[]);
  } catch (error) {
    next(error);
  }
};

export default getSoundWave;
