import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const app = express();

const connectDb = async (): Promise<void> => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTIONSTRING as string);
        console.log("Connected to", connect.connection.name);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

connectDb();
const port = process.env.PORT || 5000;

app.use(express.json());


app.listen(port, () => {
    console.log(`Server running on Port ${port}`);
})
