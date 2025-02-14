import mongoose from "mongoose"
import Logger from "@code_blaster/logger"
const MONGO_URI = process.env.NODE_ENV === 'production' ? process.env.MONGO_URL : 'mongodb://localhost:27017/'
const connectDb = () => {
    mongoose.connect(MONGO_URI, {
        dbName: "code_blaster_3000"
    }).then(() => {
        Logger.log("Database Connected")
    })
}

export {
    connectDb
}