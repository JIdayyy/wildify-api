"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../../../prisma/client"));
const deleteOne = async (req, res, next) => {
    const { id } = req.params;
    try {
        await client_1.default.artist.delete({
            where: {
                id,
            },
        });
        res.status(200).json(`Artist with id: ${id} deleted successfully`);
    }
    catch (error) {
        next(error);
    }
};
exports.default = deleteOne;
