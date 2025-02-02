"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("./Database"));
const Express_1 = __importDefault(require("./Express"));
class App {
    static loadServer() {
        Express_1.default.init();
    }
    static loadDatabase() {
        Database_1.default.init();
    }
}
exports.default = App;
