"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../../../prisma/client"));
const put = async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const album = await client_1.default.album.update({
            where: {
                id,
            },
            data: {
                ...data,
            },
        });
        res.status(200).json(album);
    }
    catch (error) {
        next(error);
    }
};
exports.default = put;
