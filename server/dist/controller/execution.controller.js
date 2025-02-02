"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkResultController = exports.submitCodeController = void 0;
const uuid_1 = require("uuid");
const redis_1 = require("../utils/redis");
const code_model_1 = __importDefault(require("../db/code.model"));
const response_model_1 = __importDefault(require("../db/response.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const submitCodeController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { code, language } = req.body;
    const jobId = (0, uuid_1.v4)();
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        yield redis_1.client.lPush("submissions", JSON.stringify({
            jobId,
            code,
            language
        }));
        yield code_model_1.default.create({
            jobId,
            code,
            language
        });
        yield session.commitTransaction();
        res.status(200).json({
            success: true,
            jobId
        });
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        yield redis_1.client.lRem("submissions", 0, JSON.stringify({ jobId, code, language }));
        console.error('Error submitting code:', error);
        next(error);
    }
});
exports.submitCodeController = submitCodeController;
const checkResultController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { jobId } = req.body;
    try {
        const result = yield response_model_1.default.findOne({
            jobId
        });
        if (!result) {
            res.status(404).json({
                success: false,
                status: "Pending"
            });
            return;
        }
        res.status(200).json({
            success: true,
            status: result.status,
            response: result.response
        });
    }
    catch (error) {
        console.error('Error submitting code:', error);
        next(error);
    }
});
exports.checkResultController = checkResultController;
