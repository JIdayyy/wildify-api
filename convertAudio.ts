import ffmpeg from "ffmpeg";

async function convert(videoPath: string, audioPath: string) {
  try {
    const process = new ffmpeg(videoPath, (err, video) => {
      return video.fnExtractSoundToMP3(audioPath, function (error, file) {
        console.log(error);
        if (!error) console.log("Audio file: " + file);
      });
    });
  } catch (e) {
    console.log(e);
  }
}

module.exports = convert;
