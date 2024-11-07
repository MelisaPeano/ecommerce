"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddleware = LoggerMiddleware;
function LoggerMiddleware(req, res, next) {
    console.log(`Request: ${req.method} ${req.url} a la hora ${new Date()}`);
    next();
}
//# sourceMappingURL=logger.middleware.js.map