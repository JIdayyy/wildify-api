import { Router } from "express";
import albumValidator from "../../JOI/album";
import bodyValidator from "../../middlewares/bodyValidator";
import controller from "./controller";

const router = Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.put("/:id", bodyValidator(albumValidator.put), controller.put);
router.delete("/:id", controller.delete);
router.post("/", controller.post);
router.post(
  "/:id/picture",
  bodyValidator(albumValidator.post),
  controller.pictureUpload
);

export default router;
