import { Router } from "express";
import songs from "../api/songs/routes";
import albums from "../api/albums/routes";
import artists from "../api/artists/routes";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).send("API - 👋🌎🌍🌏");
});

router.use("/songs", songs);
router.use("/albums", albums);
router.use("/artists", artists);

export default router;
