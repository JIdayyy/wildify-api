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
router.post("/signin", controller.login);
router.post("/signup", controller.register);

export default router;
