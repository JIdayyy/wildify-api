"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getAll_1 = __importDefault(require("./handlers/getAll"));
const getOne_1 = __importDefault(require("./handlers/getOne"));
const put_1 = __importDefault(require("./handlers/put"));
const delete_1 = __importDefault(require("./handlers/delete"));
const post_1 = __importDefault(require("./handlers/post"));
const upload_1 = __importDefault(require("./handlers/upload"));
const controller = {
    getAll: getAll_1.default,
    getOne: getOne_1.default,
    put: put_1.default,
    delete: delete_1.default,
    post: post_1.default,
    pictureUpload: upload_1.default,
};
exports.default = controller;
