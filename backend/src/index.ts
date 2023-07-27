import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import volunteers from "./routes/volunteer";
import errorHandler from "./middleware/errorHandler";
import {setting} from "./config/config";

dotenv.config();
const app = express();

const connectDb = async (): Promise<void> => {
    try {
        const connect = await mongoose.connect(setting.connectionString);
        console.log("Connected to", connect.connection.name);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

connectDb();
const port = setting.port || 5000;

app.use(express.json());
app.use("/api/volunteer", volunteers);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on Port ${port}`);
})
