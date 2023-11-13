import { Router } from "express";
const router = Router();
import controller from "./controller";

router.post("/signin", controller.login);
router.post("/me", controller.me);
router.post("/signup", controller.register);

export default router;
