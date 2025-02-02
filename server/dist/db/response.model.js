"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const code_response_schema = new mongoose_1.default.Schema({
    jobId: String,
    status: String,
    response: String,
});
const Code_Response = mongoose_1.default.model('code_response', code_response_schema);
exports.default = Code_Response;
