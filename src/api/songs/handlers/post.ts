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

const post: SongHandlers["post"] = async (req, res, next) => {
  try {
    const { files } = await asyncFormParse(req);

    console.log(files);

    if (!files) {
      throw new Error("No files provided");
    }

    if (files.file.length > 1) {
      res.status(400);
      throw new Error("Please send only 1 file");
    }

    const { path } = files.file[0];

    const {
      common: { album, albumartist, title },
      format: { duration },
    } = await mm.parseFile(path, {
      duration: true,
    });

    if (!album || !albumartist || !title) {
      const errorMessage = {
        ...(!album && {
          album: "This audio file doesn't have an album in metadata",
        }),

        ...(!albumartist && {
          albumartist:
            "This audio file doesn't have an albumartist in metadata",
        }),
        ...(!title && {
          title: "This audio file doesn't have a title in metadata",
        }),
      };

      throw new Error(JSON.stringify(errorMessage));
    }

    const buffer = fs.readFileSync(path);
    const durationInSeconds = await mp3DurationString(duration);
    const type = await fileType.fromBuffer(buffer);

    const fileName = `${slugify(albumartist)}/${slugify(album)}/${slugify(
      title
    )}`;

    const count = await prisma.song.count({
      where: { title },
    });

    if (count !== 0) {
      res.status(400);
      throw new Error("This song already exists");
    }

    const metadata = {
      "Content-type": type?.mime,
    };

    const data = await minioClient.putObject(
      "wildify",
      fileName,
      buffer,
      metadata
    );

    console.log(`Upload to minio done ! ${fileName}`);

    const newSong = await prisma.song.create({
      data: {
        title,
        duration: durationInSeconds,
        link: `https://${process.env.MINIO_ENDPOINT}/wildify/${fileName}`,
        album: {
          connectOrCreate: {
            create: {
              title: album,
              artist: {
                connect: {
                  name: albumartist,
                },
              },
            },
            where: {
              title: album,
            },
          },
        },
        artist: {
          connectOrCreate: {
            create: {
              name: albumartist,
            },
            where: {
              name: albumartist,
            },
          },
        },
      },
    });

    return res.status(201).json(newSong);
  } catch (error) {
    // res.status(error.code === "P2002" ? 400 : res.statusCode || 500);
    return next(error);
  }
};

export default post;