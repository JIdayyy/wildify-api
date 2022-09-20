/**
 * using youtube-dl's `load-info-json` flag
 * When download a video with youtube-dl, the page gets downloaded retiving useful information stored in a `YtResponse`.
 * This information can be dumped using the `dump-json` or the `dump-single-json` flags.
 * Then this info can be passed to youtube-dl using a file with `load-info-json FILE` flag, so that the page won't be downloaded again
 */

// const youtubedl = require("youtube-dl-exec");
// const fs = require("fs");
// const audioConvert = require("./convertAudio");

// const getInfo = (url: any, flags?: any) =>
//   youtubedl(url, { dumpSingleJson: true, ...flags });

// const fromInfo = (infoFile: any, flags: any) =>
//   youtubedl.exec("", { loadInfoJson: infoFile, ...flags });

// async function main(url: any, callback: any) {
//   // with this function we get a YtResponse with all the info about the video
//   // this info can be read and used and then passed again to youtube-dl, without having to query it again
//   const info = await getInfo(url);

//   // write the info to a file for youtube-dl to read it
//   fs.writeFileSync("videoInfo.json", JSON.stringify(info));

//   // the info the we retrive can be read directly or passed to youtube-dl
//   console.log(info);
//   console.log(
//     (await fromInfo("videoInfo.json", { listThumbnails: true })).stdout
//   );

//   // and finally we can download the video
//   await fromInfo("videoInfo.json", { output: `videos/4.mp4` });
//   const title = info.title.replace(/[^\w\s]/gi, "").replace(/ /g, "-");
//   await audioConvert(`videos/${title}.mp4`, `audio/${title}.mp3`);

//   return await callback(`videos/4.mp4`, `audio/${title}.mp3`);
// }

// export default main;

// main("https://www.youtube.com/watch?v=YgVEH1nEY-A");

/**
 * using youtube-dl's `load-info-json` flag
 * When download a video with youtube-dl, the page gets downloaded retiving useful information stored in a `YtResponse`.
 * This information can be dumped using the `dump-json` or the `dump-single-json` flags.
 * Then this info can be passed to youtube-dl using a file with `load-info-json FILE` flag, so that the page won't be downloaded again
 */

const youtubedl = require("youtube-dl-exec");
const fs = require("fs");
const audioConvert = require("./convertAudio");
const ffmpeg = require("ffmpeg");

async function convert(videoPath: any, audioPath: any) {
  console.log("ici ca");
  console.log(videoPath);
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
        console.log("on est la");
        return video.fnExtractSoundToMP3(
          audioPath,
          function (error: any, file: string) {
            console.log(audioPath);
            console.log(error);
            if (!error) console.log("Audio file: " + file);
          }
        );
      }
    );
  } catch (e) {
    console.log(e);
  }
}

const getInfo = (url: any, flags?: any) =>
  youtubedl(url, { dumpSingleJson: true, ...flags });

const fromInfo = (infoFile: any, flags: any) =>
  youtubedl.exec("", { loadInfoJson: infoFile, ...flags });

async function main(url: any, callback: any) {
  // with this function we get a YtResponse with all the info about the video
  // this info can be read and used and then passed again to youtube-dl, without having to query it again
  const info = await getInfo(url);

  // write the info to a file for youtube-dl to read it
  fs.writeFileSync("videoInfo.json", JSON.stringify(info));

  // the info the we retrive can be read directly or passed to youtube-dl
  console.log(info.description);
  console.log(
    (await fromInfo("videoInfo.json", { listThumbnails: true })).stdout
  );

  // and  we can download the video
  const title = info.title.replace(/[^\w\s]/gi, "").replace(/ /g, "-");
  await fromInfo("videoInfo.json", { output: `videos/${title}.mp4` });

  // and finally we can convert the video to audio
  await convert(`videos/${title}.mp4.webm`, `audio/${title}.mp3`);

  await callback(`videos/${title}.mp4.webm`, `audio/${title}.mp3`);
  // fs.unlinkSync("videoInfo.json");
  // fs.unlinkSync("videos/" + info.title + ".mp4");
}

export default main;

main("https://www.youtube.com/watch?v=u9Dg-g7t2l4", () => {});
