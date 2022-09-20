import youtubeDllAndConvert from "../../../../youtube";
import ffmpeg from "ffmpeg";
import fs from "fs";

const youtube = async (req: any, res: any) => {
  const { url } = req.body;
  console.log(req.body);

  if (!url) {
    res.status(400);
    throw new Error("No url provided");
  }
  console.log(url);

  await youtubeDllAndConvert(url, async (video: any, audio: any) => {
    // console.log("start");
    // console.log("AUDIO", audio);

    try {
      const process = new ffmpeg(video, (err, vid) => {
        return vid.fnExtractSoundToMP3(audio, function (error, file) {
          console.log("ERROR", error);
          if (!error) console.log("Audio file: " + file);
          res.setHeader(
            "Content-disposition",
            "attachment; filename=dramaticpenguin.MOV"
          );
          res.setHeader("Content-type", "audio/mp3");
          // const filestream = fs.createReadStream(file);
          // filestream.pipe(res);
          res.body = {
            url: `http://localhost:4000/public/Nyan-Cat-original.mp3`,
          };
          return res.status(200).json(res.body);
        });
      });
      // console.log("ici", process);
    } catch (e: any) {
      console.log("error", e.code);
      console.log("error", e.msg);
    }
  });
};

export default youtube;
