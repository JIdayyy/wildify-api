import { Router } from "express";
import controller from "./controller";

const router = Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.put("/:id", controller.put);
router.delete("/:id", controller.delete);
router.post("/", controller.post);
router.post("/:id/picture", controller.pictureUpload);

export default router;
