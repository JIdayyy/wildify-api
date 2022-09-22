"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = __importDefault(require("./controller"));
const router = (0, express_1.Router)();
router.get("/", controller_1.default.getAll);
router.get("/download", controller_1.default.download);
router.get("/:id", controller_1.default.getOne);
router.get("/:id/soundwave", controller_1.default.getSoundWaveData);
router.put("/:id", controller_1.default.put);
router.delete("/:id", controller_1.default.delete);
router.post("/", controller_1.default.post);
router.post("/youtube", controller_1.default.youtube);
exports.default = router;
