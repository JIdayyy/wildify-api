import fs from "fs";
import * as Minio from "minio";
import audioToWaveformData, { Options } from "audioform";
import { readFile } from "fs/promises";
import { ReadableStreamWithFileType } from "file-type";

function stream2buffer(stream: ReadableStreamWithFileType): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const _buf: any[] = [];

    stream.on("data", (chunk: any) => _buf.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(_buf)));
    stream.on("error", (err: any) => reject(err));
  });
}

const createSoundWaveData = async (song: Buffer) => {
  const options: Options = {
    samples: 70, // default
    channel: 0, // default
  };

  try {
    // const buffer = await stream2buffer(song);
    const waveformData: number[] = await audioToWaveformData(song, options);

    if (!waveformData) {
      throw new Error("Error during waveform data creation");
    }

    return waveformData;
  } catch (error) {
    console.log(error);
  }
};

export default createSoundWaveData;
