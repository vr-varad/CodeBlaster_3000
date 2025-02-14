import Logger from "@code_blaster/logger"
import mongoose from "mongoose"

class Database {
    static init() {
        const MONGO_URI = process.env.NODE_ENV === 'production' ? process.env.MONGO_URL : 'mongodb://localhost:27017/'
        mongoose.connect(MONGO_URI, {
            dbName: "code_blaster_3000"
        }).then(() => {
            Logger.log("Database Connected")
        })
    }
}

export { Database }