import youtubeDllAndConvert from "../../../../youtube";
const converter = require("../../../../convertAudio");

import ffmpeg from "ffmpeg";

const youtube = async (req: any, res: any) => {
  const { url } = req.body;
  console.log(req.body);

  if (!url) {
    res.status(400);
    throw new Error("No url provided");
  }
  console.log(url);

  const process = new ffmpeg(
    "videos/Circle-Ft-Johan-Lennox.mp4.webm",
    (err, video) => {
      console.log("on est la");
      return video.fnExtractSoundToMP3("audio/4.mp3", function (error, file) {
        console.log(error);
        if (!error) console.log("Audio file: " + file);
      });
    }
  );

  // const result = await youtubeDllAndConvert(
  //   "https://www.youtube.com/watch?v=YgVEH1nEY-A",
  //   async (video: any, audio: any) => {
  //     // console.log("start");
  //     // console.log("AUDIO", audio);
  //     console.log("OK");
  //     try {
  //       // console.log("ici", process);
  //     } catch (e: any) {
  //       console.log("error", e.code);
  //       console.log("error", e.msg);
  //     }
  //   }
  // );
  // converter("videos/Circle-Ft-Johan-Lennox.mp4.webm", "audio/4.mp3");
};

export default youtube;
