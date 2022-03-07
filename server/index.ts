import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/routes";
import mongoose from "mongoose";
import bodyParser from "body-parser";
dotenv.config();

const app = express();

app.use(
	cors({
		origin: process.env.CLIENT_URL,
	})
);

app.use((_, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH"
	);
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	next();
});

// if (process.env.NODE_ENV === "production")
app.use(express.static("../client/build"));

app.use(bodyParser.json());
app.use("/api/v1/", router);

const mongoURI: string = process.env.MONGO_URI!;

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`running on port ${PORT}`));

mongoose.connect(mongoURI, () => {
	console.log("connected to mongoose");
});
