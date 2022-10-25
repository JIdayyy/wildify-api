import { Router } from "express";
import genreValidator from "../../JOI/genre";
import bodyValidator from "../../middlewares/bodyValidator";
import controller from "./controller";

const router = Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.put("/:id", bodyValidator(genreValidator.put), controller.put);
router.delete("/:id", controller.delete);
router.post("/", bodyValidator(genreValidator.post), controller.post);

export default router;
