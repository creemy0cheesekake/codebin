import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/routes";
import mongoose from "mongoose";
dotenv.config();

const app = express();

app.use(cors());

app.use("/api/v1/", router);

const mongoURI: string = process.env.MONGO_URI!;

app.listen(3000, () => console.log("running on port 3000"));

mongoose.connect(mongoURI, () => {
	console.log("connected to mongoose");
});
