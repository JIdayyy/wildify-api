"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../../../prisma/client"));
const getAll = async (req, res, next) => {
    try {
        const songs = await client_1.default.song.findMany({
            include: {
                album: true,
                artist: true,
            },
        });
        res.status(200).json(songs);
    }
    catch (error) {
        next(error);
    }
};
exports.default = getAll;
