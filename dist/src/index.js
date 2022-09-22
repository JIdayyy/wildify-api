"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.server = void 0;
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = __importDefault(require("./server"));
exports.server = http_1.default.createServer(server_1.default);
const socket_io_1 = require("socket.io");
dotenv_1.default.config();
const PORT = process.env.PORT || 4000;
exports.io = new socket_io_1.Server(exports.server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
        exposedHeaders: ["Authorization"],
    },
});
exports.server.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT} 🌎💥`);
});
