import { Router } from "express";
import songs from "../api/songs/routes";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).send("API - 👋🌎🌍🌏");
});

router.use("/songs", songs);

export default router;
