import youtubeDllAndConvert from "../../../../youtube";
import minioClient from "../../../services/minioClient";
import SongHandlers from "../interfaces";
import fileType from "file-type";
import * as mm from "music-metadata";
import fs from "fs";
import { mp3DurationString, slugify } from "../../../utils/songUtils";
import prisma from "../../../../prisma/client";
import createSoundWaveData from "../../../utils/createSoundWaveData";

const youtube: SongHandlers["youtubeDownload"] = async (req, res, next) => {
  const { url, songTitle, artistName, albumName } = req.body;

  try {
    if (!url || !albumName || !songTitle || !artistName) {
      const errorMessage = {
        ...(!albumName && {
          album: "No album name provided",
        }),

        ...(!artistName && {
          albumartist: "No artist name provided",
        }),
        ...(!songTitle && {
          title: "No song title provided",
        }),
      };

      throw new Error(JSON.stringify(errorMessage));
    }

    const { audio, songInformations } = await youtubeDllAndConvert(
      url,
      (video, audio, songInformations) => {
        return { video, audio, songInformations };
      }
    );

    console.log("ON EST LA", audio, songInformations);

    const audioFile = fs.readFileSync(audio);

    const type = await fileType.fromBuffer(audioFile);

    const metadata = {
      "Content-type": type?.mime,
    };

    const fileName = `${slugify(songInformations.artist || "test")}/${slugify(
      songInformations.album || "test"
    )}/${slugify(songInformations.title || "test")}`;

    if (audio) {
      await minioClient.putObject("wildify", fileName, audioFile, metadata);
      console.log("audio uploaded");
    }
    const soundWaveData = await createSoundWaveData(audioFile);
    console.log(soundWaveData);

    if (!soundWaveData) {
      throw new Error("Error during waveform data creation");
    }

    // const {
    //   format: { duration },
    // } = await mm.parseFile(audio, {
    //   duration: true,
    // });

    // console.log("duration", duration);

    // const durationInSeconds = await mp3DurationString(duration);

    console.log("i will record the song in the db");

    // TODO HANDLE SONG DURATION

    const newSong = await prisma.song.create({
      data: {
        title: songTitle,
        duration: "0000000",
        link: `https://${process.env.MINIO_ENDPOINT}/wildify/${fileName}`,
        album: {
          connectOrCreate: {
            create: {
              title: albumName,
              artist: {
                connect: {
                  name: artistName,
                },
              },
            },
            where: {
              title: albumName,
            },
          },
        },
        artist: {
          connectOrCreate: {
            create: {
              name: artistName,
            },
            where: {
              name: artistName,
            },
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
        artist: true,
      },
    });

    console.log(newSong);

    // fs.unlinkSync(audio);

    res.status(201).json(newSong);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default youtube;
