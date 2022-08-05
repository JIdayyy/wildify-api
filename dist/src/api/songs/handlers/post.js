"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../../../prisma/client"));
const mm = __importStar(require("music-metadata"));
const fs_1 = __importDefault(require("fs"));
const file_type_1 = __importDefault(require("file-type"));
const songUtils_1 = require("../../../utils/songUtils");
const minioClient_1 = __importDefault(require("../../../services/minioClient"));
const post = async (req, res, next) => {
    try {
        const { files } = await (0, songUtils_1.asyncFormParse)(req);
        if (!files) {
            throw new Error("No files provided");
        }
        if (files.file.length > 1) {
            res.status(400);
            throw new Error("Please send only 1 file");
        }
        const { path } = files.file[0];
        const { common: { album, albumartist, title }, format: { duration }, } = await mm.parseFile(path, {
            duration: true,
        });
        if (!album || !albumartist || !title) {
            const errorMessage = {
                ...(!album && {
                    album: "This audio file doesn't have an album in metadata",
                }),
                ...(!albumartist && {
                    albumartist: "This audio file doesn't have an albumartist in metadata",
                }),
                ...(!title && {
                    title: "This audio file doesn't have a title in metadata",
                }),
            };
            throw new Error(JSON.stringify(errorMessage));
        }
        const buffer = fs_1.default.readFileSync(path);
        const durationInSeconds = await (0, songUtils_1.mp3DurationString)(duration);
        const type = await file_type_1.default.fromBuffer(buffer);
        const fileName = `${(0, songUtils_1.slugify)(albumartist)}/${(0, songUtils_1.slugify)(album)}/${(0, songUtils_1.slugify)(title)}`;
        const count = await client_1.default.song.count({
            where: { title },
        });
        if (count !== 0) {
            res.status(400);
            throw new Error("This song already exists");
        }
        const metadata = {
            "Content-type": type === null || type === void 0 ? void 0 : type.mime,
        };
        await minioClient_1.default.putObject("wildify", fileName, buffer, metadata);
        console.log(`Upload to minio done ! ${fileName}`);
        const newSong = await client_1.default.song.create({
            data: {
                title,
                duration: durationInSeconds,
                link: `https://${process.env.MINIO_ENDPOINT}/wildify/${fileName}`,
                album: {
                    connectOrCreate: {
                        create: {
                            title: album,
                            artist: {
                                connect: {
                                    name: albumartist,
                                },
                            },
                        },
                        where: {
                            title: album,
                        },
                    },
                },
                artist: {
                    connectOrCreate: {
                        create: {
                            name: albumartist,
                        },
                        where: {
                            name: albumartist,
                        },
                    },
                },
            },
        });
        return res.status(201).json(newSong);
    }
    catch (error) {
        // res.status(error.code === "P2002" ? 400 : res.statusCode || 500);
        return next(error);
    }
};
exports.default = post;
