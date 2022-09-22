import github from "./handlers/github";
import githubCb from "./handlers/github-cb";
import login from "./handlers/login";
import register from "./handlers/register";
import me from "./handlers/me";

const controller = {
  github,
  githubCb,
  login,
  register,
  me,
};

export default controller;
