import getAll from "./handlers/getAll";
import getOne from "./handlers/getOne";
import put from "./handlers/put";
import deleteOne from "./handlers/delete";
import post from "./handlers/post";
import addSongs from "./handlers/addSongs";

const controller = {
  getAll,
  getOne,
  put,
  delete: deleteOne,
  post,
  addSongs,
};

export default controller;
