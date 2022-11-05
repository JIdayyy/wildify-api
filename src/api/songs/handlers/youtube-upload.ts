import youtubeDllAndConvert from "../../../utils/youtube";
import minioClient from "../../../services/minioClient";
import SongHandlers from "../interfaces";
import fileType from "file-type";
import fs from "fs";
import { slugify } from "../../../utils/songUtils";
import prisma from "../../../../prisma/client";
import createSoundWaveData from "../../../utils/createSoundWaveData";

const youtube: SongHandlers["youtubeDownload"] = async (req, res, next) => {
  const { url, songTitle, artistName, albumName, genre } = req.body;
  const { user } = req;

  if (!user) {
    return next(new Error("User not found"));
  }

  try {
    if (!url || !albumName || !songTitle || !artistName || !genre) {
      const errorMessage = {
        ...(!albumName && {
          album: "This audio file doesn't have an album in metadata",
        }),

        ...(!artistName && {
          albumartist:
            "This audio file doesn't have an albumartist in metadata",
        }),
        ...(!songTitle && {
          title: "This audio file doesn't have a title in metadata",
        }),
        ...(!genre && {
          genre: "This audio file doesn't have a genre in metadata",
        }),
      };

      throw new Error(JSON.stringify(errorMessage));
    }

    const { audio, video, songInformations } = await youtubeDllAndConvert(url);

    const audioFile = fs.readFileSync(audio);

    const type = await fileType.fromBuffer(audioFile);

    const metadata = {
      "Content-type": type?.mime,
    };

    const fileName = `${slugify(songInformations.artist || "test")}/${slugify(
      songInformations.album || "test"
    )}/${slugify(songInformations.title || "test")}`;

    await minioClient.putObject("wildify", fileName, audioFile, metadata);
    console.log("audio uploaded");

    fs.unlinkSync("videoInfo.json");
    fs.unlinkSync(video);
    fs.unlinkSync(audio);

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
