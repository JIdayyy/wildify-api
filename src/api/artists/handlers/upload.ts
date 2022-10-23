import { NextFunction, Request, Response } from "express";
import minioClient from "../../../services/minioClient";
import { asyncFormParse, slugify } from "../../../utils/songUtils";
import fileType from "file-type";
import fs from "fs";
import prisma from "../../../../prisma/client";
import sharp from "sharp";
import { io } from "../../../socket";

const artistPictureUpload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { files } = await asyncFormParse(req);

    if (!files) {
      throw new Error("No files provided");
    }

    if (files.file.length > 1) {
      res.status(400);
      throw new Error("Please send only 1 file");
    }

    const { path } = files.file[0];

    const buffer = sharp(fs.readFileSync(path))
      .resize(450, 450)
      .webp({ lossless: true });

    const type = await fileType.fromBuffer(await buffer.toBuffer());

    const metadata = {
      "Content-type": type?.mime,
    };

    const artist = await prisma.artist.findUniqueOrThrow({
      where: {
        id: req.params.id,
      },
      include: {
        albums: true,
      },
    });

    const pictureName = artist.picture?.split("/").pop();

    minioClient.putObject(
      "wildify",
      `${slugify(artist?.name as string)}/${files.file[0].originalFilename}`,
      buffer,
      metadata
    );

    minioClient.removeObject(
      "wildify",
      `${slugify(artist?.name as string)}/${pictureName}`
    );

    if (!artist) {
      throw new Error("Album not found");
    }

    const updatedArtist = await prisma.album.update({
      where: {
        id: req.params.id,
      },
      data: {
        picture: `https://${process.env.MINIO_ENDPOINT}/wildify/${slugify(
          artist?.name as string
        )}/${files.file[0].originalFilename}`,
      },
    });

    io.emit("ALBUM_UPDATE", updatedArtist);

    return res.status(200).json(updatedArtist);
  } catch (error) {
    next(error);
  }
};

export default artistPictureUpload;
