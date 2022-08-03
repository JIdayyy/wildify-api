import getAll from "../songs/handlers/getAll";
import getOne from "../songs/handlers/getOne";
import put from "../songs/handlers/put";
import deleteOne from "../songs/handlers/delete";
import post from "../songs/handlers/post";

const controller = {
  getAll,
  getOne,
  put,
  delete: deleteOne,
  post,
};

export default controller;
