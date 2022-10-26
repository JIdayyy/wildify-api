import { NextFunction, Request, Response } from "express";
import minioClient from "../../../services/minioClient";
import { asyncFormParse, slugify } from "../../../utils/songUtils";
import fileType from "file-type";
import fs from "fs";
import prisma from "../../../../prisma/client";
import sharp from "sharp";
import { io } from "../../../socket";

const playlistPictureUpload = async (
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

    const playlist = await prisma.playlist.findUniqueOrThrow({
      where: {
        id: req.params.id,
      },
    });

    if (!playlist) {
      throw new Error("Album not found");
    }

    const pictureName = playlist.picture?.split("/").pop();

    console.log("pictureName", pictureName);

    minioClient.putObject(
      "wildify",
      `${slugify(playlist.title)}/${files.file[0].originalFilename}`,
      buffer,
      metadata
    );

    minioClient.removeObject(
      "wildify",
      `${slugify(playlist.title as string)}/${pictureName}`
    );

    const updatedPlaylist = await prisma.playlist.update({
      where: {
        id: req.params.id,
      },
      data: {
        picture: `https://${process.env.MINIO_ENDPOINT}/wildify/${slugify(
          playlist.title
        )}/${files.file[0].originalFilename}`,
      },
    });

    io.emit("PLAYLIST_UPDATE", updatedPlaylist);

    return res.status(200).json(updatedPlaylist);
  } catch (error) {
    next(error);
  }
};

export default playlistPictureUpload;
