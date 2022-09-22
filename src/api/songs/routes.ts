import { Router } from "express";
import controller from "./controller";

const router = Router();

router.get("/", controller.getAll);
router.get("/download", controller.download);
router.get("/:id", controller.getOne);
router.get("/:id/soundwave", controller.getSoundWaveData);
router.put("/:id", controller.put);
router.delete("/:id", controller.delete);
router.post("/", controller.post);
router.post("/youtube", controller.youtube);

export default router;
