import { Router } from "express";
import artistValidator from "../../JOI/artist";
import bodyValidator from "../../middlewares/bodyValidator";
import controller from "./controller";

const router = Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.put("/:id", bodyValidator(artistValidator.put), controller.put);
router.delete("/:id", controller.delete);
router.post("/", bodyValidator(artistValidator.post), controller.post);

export default router;
