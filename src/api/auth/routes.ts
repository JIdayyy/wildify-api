import { Router } from "express";
const router = Router();

import passport from "../../utils/passport";
import controller from "./controller";

router.get("/github", controller.github);
router.get(
  "/github/cb",
  passport.authenticate("github", {
    failureRedirect: "/",
    session: false,
  }),
  controller.githubCb
);
router.post("/login", controller.login);
router.post("/register", controller.register);

export default router;
