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
const db_1 = __importDefault(require("./utils/db"));
const redis_1 = require("./utils/redis");
const response_model_1 = __importDefault(require("./model/response.model"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield redis_1.client.connect();
    (0, db_1.default)();
    while (true) {
        try {
            const submission = yield redis_1.client.brPop("submissions", 0);
            const { jobId, code, language } = JSON.parse(submission.element);
            // will do some computation to get the response and status
            setTimeout(() => {
                response_model_1.default.create({
                    jobId,
                    status: "DONE",
                    response: "hello"
                });
            }, 10000);
        }
        catch (error) {
            console.log(error);
        }
    }
});
main();
