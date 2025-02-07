import express from "express"
import { Routes } from "../route/index.js"
import { errorHandler } from "../utils/errorHandler.js"

class Express {
    static app = express();
    static PORT = process.env.PORT || 3000

    static async init() {
        this.app.use(express.json());
        new Routes(this.app)
        this.app.use(errorHandler);
        this.app.listen(this.PORT, () => {
            console.log("The Server is Running on Port: ", this.PORT)
        })
    }
}

export { Express }