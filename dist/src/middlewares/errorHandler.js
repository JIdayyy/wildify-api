"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(err, req, res, _next) {
    const status = res.statusCode === 200 ? 500 : res.statusCode;
    console.error(err, err.details
        ? err.details.map((detail) => detail.message)
        : "Undefined Error");
    res.status(status).send({
        status: status,
        message: err.message,
        details: err.details ? err.details.map((detail) => detail.message) : "🛠",
    });
}
exports.default = errorHandler;
