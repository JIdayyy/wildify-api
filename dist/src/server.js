"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const passport_1 = __importDefault(require("passport"));
const cors_1 = __importDefault(require("cors"));
const api_1 = __importDefault(require("./api"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use(passport_1.default.initialize());
app.use(body_parser_1.default.json());
app.use("/api/v1", api_1.default);
app.use(errorHandler_1.default);
exports.default = app;
