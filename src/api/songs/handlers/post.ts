import prisma from "../../../../prisma/client";
import SongHandlers from "../interfaces";
import * as mm from "music-metadata";
import fs from "fs";
import fileType from "file-type";
import {
  asyncFormParse,
  slugify,
  mp3DurationString,
} from "../../../utils/songUtils";
import minioClient from "../../../services/minioClient";
import createSoundWaveData from "../../../utils/createSoundWaveData";
import { Prisma } from "@prisma/client";
import { io } from "../../../socket";

const post: SongHandlers["post"] = async (req, res, next) => {
  try {
    const { user } = req;

    if (!user) {
      return next(new Error("User not found"));
    }

    const {
      files,
      fields: { title, album, artist, genre },
    } = await asyncFormParse(req);

    if (!files) {
      throw new Error("No files provided");
    }

    if (files.files.length > 1) {
      res.status(400);
      throw new Error("Please send only 1 file");
    }

    const { path } = files.files[0];

    const {
      format: { duration },
    } = await mm.parseFile(path, {
      duration: true,
    });

    const buffer = fs.readFileSync(path);
    const durationInSeconds = await mp3DurationString(duration);
    const type = await fileType.fromBuffer(buffer);

    const fileName = `${slugify(artist[0])}/${slugify(album[0])}/${slugify(
      title[0]
    )}`;

    const metadata = {
      "Content-type": type?.mime,
    };

    await minioClient.putObject("wildify", fileName, buffer, metadata);

    console.log(`Upload to minio done ! ${fileName}`);

    const soundWaveData = await createSoundWaveData(buffer);

    if (!soundWaveData) {
      throw new Error("Error during waveform data creation");
    }

    console.log("Waveform Created");

    const newSong = await prisma.song.create({
      data: {
        title: title[0],
        duration: durationInSeconds,
        link:
          process.env.NODE_ENV === "development"
            ? `https://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/wildify/${fileName}`
            : `http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/wildify/${fileName}`,
        album: {
          connectOrCreate: {
            create: {
              title: album[0],
              artist: {
                connect: {
                  name: artist[0],
                },
              },
            },
            where: {
              title: album[0],
            },
          },
        },
        artist: {
          connectOrCreate: {
            create: {
              name: artist[0],
            },
            where: {
              name: artist[0],
            },
          },
        },
        genre: {
          connectOrCreate: {
            create: {
              name: genre[0],
            },
            where: {
              name: genre[0],
            },
          },
        },
        user: {
          connect: {
            id: user.id as string,
          },
        },
        soundWave: {
          create: {
            data: JSON.stringify(soundWaveData),
          },
        },
      },
      include: {
        album: true,
        genre: true,
        artist: true,
      },
    });

    io.emit("NEW_SONG", newSong);

    return res.status(201).json(newSong);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(error.code === "P2002" ? 400 : res.statusCode || 500);
      next(error);
    }
    next(error);
  }
};

export default post;
