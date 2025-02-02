"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const execution_controller_1 = require("../controller/execution.controller");
class Execultor {
    constructor() {
        this.router = express_1.default.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.route('/submit').post(execution_controller_1.submitCodeController);
        this.router.route('/result').get(execution_controller_1.checkResultController);
    }
}
exports.default = new Execultor().router;
