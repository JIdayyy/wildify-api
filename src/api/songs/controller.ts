import getAll from "../songs/handlers/getAll";
import getOne from "../songs/handlers/getOne";
import put from "../songs/handlers/put";
import deleteOne from "../songs/handlers/delete";
import post from "../songs/handlers/post";
import download from "../songs/handlers/download";
import getSoundWaveData from "../songs/handlers/getSoundWave";
import youtube from "./handlers/youtube-upload";

const controller = {
  getAll,
  getOne,
  put,
  delete: deleteOne,
  post,
  youtube,
  download,
  getSoundWaveData,
};

export default controller;
