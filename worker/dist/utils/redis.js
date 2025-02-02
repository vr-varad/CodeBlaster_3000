"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const redis_1 = require("redis");
const client = (0, redis_1.createClient)({
    url: "redis://127.0.0.1:6379"
});
exports.client = client;
client.on("error", (err) => {
    console.log("Error: ", err);
});
