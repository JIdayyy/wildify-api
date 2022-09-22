"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getAll_1 = __importDefault(require("../songs/handlers/getAll"));
const getOne_1 = __importDefault(require("../songs/handlers/getOne"));
const put_1 = __importDefault(require("../songs/handlers/put"));
const delete_1 = __importDefault(require("../songs/handlers/delete"));
const post_1 = __importDefault(require("../songs/handlers/post"));
const youtube_upload_1 = __importDefault(require("../songs/handlers/youtube-upload"));
const download_1 = __importDefault(require("../songs/handlers/download"));
const getSoundWave_1 = __importDefault(require("../songs/handlers/getSoundWave"));
const controller = {
    getAll: getAll_1.default,
    getOne: getOne_1.default,
    put: put_1.default,
    delete: delete_1.default,
    post: post_1.default,
    youtube: youtube_upload_1.default,
    download: download_1.default,
    getSoundWaveData: getSoundWave_1.default,
};
exports.default = controller;
