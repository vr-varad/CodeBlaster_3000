"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const execute_route_1 = __importDefault(require("./execute.route"));
class Routes {
    constructor(app) {
        app.use('/api/v1', execute_route_1.default);
    }
}
exports.default = Routes;
