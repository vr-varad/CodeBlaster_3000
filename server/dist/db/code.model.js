"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const code_schema = new mongoose_1.default.Schema({
    code: String,
    language: String,
    jobId: String
});
const Code = mongoose_1.default.model('code', code_schema);
exports.default = Code;
