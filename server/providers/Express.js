import express from "express"
import { Routes } from "../route/index.js"
import { errorHandler } from "../utils/errorHandler.js"
import Logger from "@code_blaster/logger";

class Express {
    static app = express();
    static PORT = process.env.PORT || 3000

    static async init() {
        this.app.use(express.json());
        new Routes(this.app)
        this.app.use(errorHandler);
    }

    static startServer() {
        this.app.listen(this.PORT, () => {
            Logger.log("Server Starting At Port " + this.PORT)
        })
    }
}
Express.init()
export const app = Express.app
export { Express }