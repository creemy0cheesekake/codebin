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
		credentials: true,
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
	res.setHeader("Access-Control-Allow-Credentials", "true");
	next();
});

app.use(bodyParser.json());
app.use("/api/v1/", router);

const mongoURI: string = process.env.MONGO_URI!;

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`running on port ${PORT}`));

mongoose.connect(mongoURI, () => {
	console.log("connected to mongoose");
});
// TODO: IDIOT ADD ERROR CODES
// TODO: add try catch blocks for every async function
// TODO: fix password indicator
