import getAll from "./handlers/getAll";
import getOne from "./handlers/getOne";
import put from "./handlers/put";
import deleteOne from "./handlers/delete";
import post from "./handlers/post";

const controller = {
  getAll,
  getOne,
  put,
  delete: deleteOne,
  post,
};

export default controller;
