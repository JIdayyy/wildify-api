import ffmpeg from "ffmpeg";

async function convert(videoPath: string, audioPath: string) {
  console.log("ici ca");
  console.log(videoPath);
  try {
    const process = new ffmpeg(videoPath, (err, video) => {
      console.log("on est la");
      return video.fnExtractSoundToMP3(audioPath, function (error, file) {
        console.log(audioPath);
        console.log(error);
        if (!error) console.log("Audio file: " + file);
      });
    });
  } catch (e) {
    console.log(e);
  }
}

module.exports = convert;
