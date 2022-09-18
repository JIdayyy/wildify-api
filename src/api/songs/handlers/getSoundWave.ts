import fs from "fs";
import * as Minio from "minio";
import dotenv from "dotenv";
dotenv.config();
// import decode from "audio-decode";
// import { decodeAudioData } from "decode-audio-data";
import audioToWaveformData, { Options } from "audioform";
import { readFile } from "fs/promises";
import SongHandlers from "../interfaces";
import prisma from "../../../../prisma/client";
import { ReadableStreamWithFileType } from "file-type";

const options: Options = {
  samples: 70, // default
  channel: 0, // default
};
const { MINIO_USERNAME, MINIO_PASSWORD, MINIO_ENDPOINT } = process.env;

const minioClient = new Minio.Client({
  endPoint: MINIO_ENDPOINT as string,
  port: 80,
  useSSL: false,
  accessKey: MINIO_USERNAME || "minio_acces_key",
  secretKey: MINIO_PASSWORD || "minio_secret_key",
});

function stream2buffer(stream: ReadableStreamWithFileType): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const _buf: any[] = [];

    stream.on("data", (chunk: any) => _buf.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(_buf)));
    stream.on("error", (err: any) => reject(err));
  });
}

const getSoundWave: SongHandlers["getSoundWaveData"] = async (
  req,
  res,
  next
) => {
  const { id } = req.params;
  try {
    const song = await prisma.song.findUnique({
      where: {
        id,
      },
      include: {
        artist: true,
        album: true,
      },
    });
    const splitLink = song.link.split("/").slice(4, 7).join("/");

    const object = await minioClient.getObject("wildify", splitLink);

    const buffer = await stream2buffer(object);
    const waveformData: number[] = await audioToWaveformData(buffer, options);

    return res.status(200).json(waveformData);
  } catch (error) {
    next(error);
  }
};

export default getSoundWave;
