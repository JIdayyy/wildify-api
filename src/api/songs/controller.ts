import getAll from "../songs/handlers/getAll";
import getOne from "../songs/handlers/getOne";
import put from "../songs/handlers/put";
import deleteOne from "../songs/handlers/delete";
import post from "../songs/handlers/post";
import youtube from "../songs/handlers/youtube-upload";
import download from "../songs/handlers/download";

const controller = {
  getAll,
  getOne,
  put,
  delete: deleteOne,
  post,
  youtube,
  download,
};

export default controller;
