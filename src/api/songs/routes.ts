import { Router } from "express";
import songValidator from "../../JOI/songs";
import bodyValidator from "../../middlewares/bodyValidator";
import controller from "./controller";

const router = Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.get("/:id/soundwave", controller.getSoundWaveData);
router.put("/:id", bodyValidator(songValidator.put), controller.put);
router.delete("/:id", controller.delete);
router.post("/", controller.post);
router.post("/youtube", controller.youtube);

export default router;
