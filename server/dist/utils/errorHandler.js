"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    return next(res.status(500).json({
        success: false,
        message: 'Internal Server Error'
    }));
};
exports.default = errorHandler;
