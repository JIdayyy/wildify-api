import { Router } from "express";
import playlistValidator from "../../JOI/playlist";
import bodyValidator from "../../middlewares/bodyValidator";
import controller from "./controller";

const router = Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.put("/:id", bodyValidator(playlistValidator.put), controller.put);
router.delete("/:id", controller.delete);
router.post("/", bodyValidator(playlistValidator.post), controller.post);
router.post(
  "/addsong",
  bodyValidator(playlistValidator.addSongs),
  controller.addSongs
);

export default router;
