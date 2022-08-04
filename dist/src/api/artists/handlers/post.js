"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../../../prisma/client"));
const post = async (req, res, next) => {
    const { body } = req;
    try {
        const newArtist = await client_1.default.artist.create({
            data: {
                ...body,
            },
        });
        return res.status(201).json(newArtist);
    }
    catch (error) {
        return next(error);
    }
};
exports.default = post;
