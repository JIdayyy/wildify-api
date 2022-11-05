import youtubedl from "youtube-dl-exec";
import fs from "fs";
import ffmpeg from "ffmpeg";
import youtubeDlExec from "youtube-dl-exec";

type SongInformations = {
  title: string;
  artist: string;
  album: string;
};

async function convert(videoPath: any, audioPath: any) {
  return new Promise((resolve, reject) => {
    try {
      const process = new ffmpeg(
        videoPath,
        async (
          err: any,
          video: {
            fnExtractSoundToMP3: (
              arg0: any,
              arg1: (error: any, file: any) => void
            ) => any;
          }
        ) => {
          const data = await video.fnExtractSoundToMP3(
            audioPath,
            async function (error: any, file: string) {
              if (error) {
                reject(error);
              }
              console.log("l'erreur est ici", error);
              if (!error) console.log("Audio extraction end: " + file);
              resolve(file);
            }
          );
        }
      );
    } catch (e) {
      console.log(e);
      return false;
    }
  });
}

const getInfo = async (url: any, flags?: any) =>
  await youtubedl(url, { dumpSingleJson: true, ...flags });

const fromInfo = async (infoFile: any, flags: any) =>
  await youtubeDlExec("", { loadInfoJson: infoFile, ...flags });

async function main(url: any) {
  const info = await getInfo(url);

  fs.writeFileSync("videoInfo.json", JSON.stringify(info));

  const title = info.title.replace(/[^\w\s]/gi, "").replace(/ /g, "-");

  const video = await fromInfo("videoInfo.json", {
    output: `videos/${title}.mp4`,
  });

  const videoConverted = await convert(
    `videos/${title}.mp4.webm`,
    `audio/${title}.mp3`
  );

  console.log("converted", videoConverted);

  const songInformations = {
    title: info.title.split(" - ")[1],
    artist: info.artist || info.title.split("-")[0],
    album: info.artist + " (unclassified)",
  };

  // fs.unlinkSync("videoInfo.json");
  // fs.unlinkSync(`videos/${title}.mp4.webm`);
  return {
    video: `videos/${title}.mp4.webm`,
    audio: `audio/${title}.mp3`,
    songInformations,
  };
}

export default main;
