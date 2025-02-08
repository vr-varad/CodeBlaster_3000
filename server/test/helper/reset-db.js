import mongoose from "mongoose";

const reset_db = async () => {
    await mongoose.connect("mongodb://localhost:27017/", { dbName: "code_blaster_3000" });

    await mongoose.connection.dropDatabase();

    console.log("Database reset successfully!");

    await mongoose.connection.close();
};

export default reset_db;
