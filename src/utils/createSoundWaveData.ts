import audioToWaveformData, { Options } from "audioform";

const createSoundWaveData = async (song: Buffer) => {
  const options: Options = {
    samples: 120,
    channel: 0,
  };

  const waveformData: number[] = await audioToWaveformData(song, options);

  if (!waveformData) {
    throw new Error("Error during waveform data creation");
  }

  return waveformData;
};

export default createSoundWaveData;
