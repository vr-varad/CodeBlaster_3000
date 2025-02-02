"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDb = () => {
    mongoose_1.default.connect("mongodb://localhost:27017/", {
        dbName: "code_blaster_3000"
    }).then(() => {
        console.log("Database Connected");
    });
};
exports.default = connectDb;
