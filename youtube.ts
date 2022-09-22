import youtubedl from "youtube-dl-exec";
import fs from "fs";
import ffmpeg from "ffmpeg";
import youtubeDlExec from "youtube-dl-exec";
import { transformAuthInfo } from "passport";

type SongInformations = {
  title: string;
  artist: string;
  album: string;
};

async function convert(videoPath: any, audioPath: any) {
  try {
    const process = new ffmpeg(
      videoPath,
      (
        err: any,
        video: {
          fnExtractSoundToMP3: (
            arg0: any,
            arg1: (error: any, file: any) => void
          ) => any;
        }
      ) => {
        return video.fnExtractSoundToMP3(
          audioPath,
          function (error: any, file: string) {
            console.log(error);
            if (!error) console.log("Audio file: " + file);
            return file;
          }
        );
      }
    );
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

const getInfo = (url: any, flags?: any) =>
  youtubedl(url, { dumpSingleJson: true, ...flags });

const fromInfo = (infoFile: any, flags: any) =>
  youtubeDlExec("", { loadInfoJson: infoFile, ...flags });

async function main(
  url: any,
  callback: (
    videoPath: string,
    audioPath: string,
    songInformations: SongInformations
  ) => { video: string; audio: string; songInformations: SongInformations }
) {
  const info = await getInfo(url);

  fs.writeFileSync("videoInfo.json", JSON.stringify(info));

  const title = info.title.replace(/[^\w\s]/gi, "").replace(/ /g, "-");
  const video = await fromInfo("videoInfo.json", {
    output: `videos/${title}.mp4`,
  });

  await convert(`videos/${title}.mp4.webm`, `audio/${title}.mp3`);

  const songInformations = {
    title: info.title.split(" - ")[1],
    artist: info.artist || info.title.split("-")[0],
    album: info.artist + " (unclassified)",
  };

  // fs.unlinkSync("videoInfo.json");
  // fs.unlinkSync(`videos/${title}.mp4.webm`);
  return callback(
    `videos/${title}.mp4.webm`,
    `audio/${title}.mp3`,
    songInformations
  );
}

export default main;
