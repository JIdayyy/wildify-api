import github from "./handlers/github";
import githubCb from "./handlers/github-cb";
import login from "./handlers/login";
import register from "./handlers/register";

const controller = {
  github,
  githubCb,
  login,
  register,
};

export default controller;
