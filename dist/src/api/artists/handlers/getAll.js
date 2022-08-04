"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../../../prisma/client"));
const getAll = async (req, res, next) => {
    try {
        const artists = await client_1.default.artist.findMany();
        res.status(200).json(artists);
    }
    catch (error) {
        next(error);
    }
};
exports.default = getAll;
