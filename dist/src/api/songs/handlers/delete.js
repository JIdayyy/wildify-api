"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../../../prisma/client"));
const minioClient_1 = __importDefault(require("../../../services/minioClient"));
const songUtils_1 = require("../../../utils/songUtils");
const deleteOne = async (req, res, next) => {
    var _a, _b, _c, _d, _e, _f;
    const { id } = req.params;
    try {
        const file = await client_1.default.song.delete({
            where: {
                id,
            },
            include: {
                album: true,
                artist: true,
            },
        });
        console.log(`${(_a = file.artist) === null || _a === void 0 ? void 0 : _a.name}/${(_b = file.album) === null || _b === void 0 ? void 0 : _b.title}/${file.title}`);
        const deleted = await minioClient_1.default.removeObject("wildify", `${(0, songUtils_1.slugify)((_c = file.artist) === null || _c === void 0 ? void 0 : _c.name)}/${(0, songUtils_1.slugify)((_d = file.album) === null || _d === void 0 ? void 0 : _d.title)}/${(0, songUtils_1.slugify)(file.title)}`);
        console.log(`${(0, songUtils_1.slugify)((_e = file.artist) === null || _e === void 0 ? void 0 : _e.name)}/${(0, songUtils_1.slugify)((_f = file.album) === null || _f === void 0 ? void 0 : _f.title)}/${(0, songUtils_1.slugify)(file.title)}`);
        res.status(200).json(`Song with id: ${id} deleted successfully`);
    }
    catch (error) {
        next(error);
    }
};
exports.default = deleteOne;
