import mongoose from "mongoose";


const connectDb = () => {
    mongoose.connect("mongodb://mongo:27017/", {
        dbName: "code_blaster_3000"
    } as mongoose.ConnectOptions).then(() => {
        console.log("Database Connected")
    })
}


export default connectDb