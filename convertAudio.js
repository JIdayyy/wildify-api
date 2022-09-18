var ffmpeg = require("ffmpeg");

async function convert(videoPath, audioPath) {
  try {
    const process = new ffmpeg(videoPath, (err, video) => {
      return video.fnExtractSoundToMP3(audioPath, function (error, file) {
        console.log(error);
        if (!error) console.log("Audio file: " + file);
      });
    });
  } catch (e) {
    console.log(e.code);
    console.log(e.msg);
  }
}

module.exports = convert;
