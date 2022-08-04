"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes_1 = __importDefault(require("../api/songs/routes"));
const routes_2 = __importDefault(require("../api/albums/routes"));
const routes_3 = __importDefault(require("../api/artists/routes"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    return res.status(200).send("API - 👋🌎🌍🌏");
});
router.use("/songs", routes_1.default);
router.use("/albums", routes_2.default);
router.use("/artists", routes_3.default);
exports.default = router;
