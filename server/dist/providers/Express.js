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
const express_1 = __importDefault(require("express"));
const route_1 = __importDefault(require("../route"));
const redis_1 = require("../utils/redis");
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
class Express {
    static init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.use(express_1.default.json());
            new route_1.default(this.app);
            this.app.use(errorHandler_1.default);
            yield redis_1.client.connect();
            this.app.listen(this.PORT, () => {
                console.log("The Server is Running on Port: ", this.PORT);
            });
        });
    }
}
Express.app = (0, express_1.default)();
Express.PORT = process.env.PORT || 3000;
exports.default = Express;
