import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/routes";
import mongoose from "mongoose";
import bodyParser from "body-parser";
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1/", router);

app.use(function (req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	next();
});

const mongoURI: string = process.env.MONGO_URI!;

app.listen(process.env.PORT, () =>
	console.log(`running on port ${process.env.PORT}`)
);

mongoose.connect(mongoURI, () => {
	console.log("connected to mongoose");
});
// TODO: refactor api routes to fit REST standards
// TODO: add indicator for whether or not a password is set
