import { NextFunction, Request, Response } from "express";
import minioClient from "../../../services/minioClient";
import { asyncFormParse, slugify } from "../../../utils/songUtils";
import fileType from "file-type";
import fs from "fs";
import prisma from "../../../../prisma/client";

const albumPictureUpload = async (
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

    const buffer = fs.readFileSync(path);

    const type = await fileType.fromBuffer(buffer);

    const metadata = {
      "Content-type": type?.mime,
    };

    const album = await prisma.album.findUniqueOrThrow({
      where: {
        id: req.params.id,
      },
      include: {
        artist: true,
      },
    });

    minioClient.putObject(
      "wildify",
      `${slugify(album.artist?.name as string)}/${slugify(album.title)}/${
        files.file[0].originalFilename
      }`,
      buffer,
      metadata
    );

    if (!album) {
      throw new Error("Album not found");
    }

    const updatedAlbum = await prisma.album.update({
      where: {
        id: req.params.id,
      },
      data: {
        picture: `https://${process.env.MINIO_ENDPOINT}/wildify/${slugify(
          album.artist?.name as string
        )}/${slugify(album.title)}/${files.file[0].originalFilename}`,
      },
    });

    res.status(200).json(updatedAlbum);
  } catch (error) {
    next(error);
  }
};

export default albumPictureUpload;
