import { Router } from "express";
import songs from "../api/songs/routes";
import albums from "../api/albums/routes";
import artists from "../api/artists/routes";
import playlist from "../api/playlists/routes";
import auth from "./auth/routes";
import { checkToken } from "../middlewares/checkToken";

const router = Router();

router.get("/", (req, res) => {
  return res.status(200).send("API - 👋🌎🌍🌏");
});

router.use("/auth", auth);

router.use(checkToken);

router.use("/songs", songs);
router.use("/albums", albums);
router.use("/artists", artists);
router.use("/playlists", playlist);

export default router;
