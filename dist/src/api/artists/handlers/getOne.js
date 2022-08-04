"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../../../prisma/client"));
const getOne = async (req, res, next) => {
    const { id } = req.params;
    try {
        const artist = await client_1.default.artist.findUnique({
            where: {
                id,
            },
        });
        res.status(200).json(artist);
    }
    catch (error) {
        next(error);
    }
};
exports.default = getOne;
