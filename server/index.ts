import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/routes";
dotenv.config();

const app = express();

app.use(cors());

app.use("/api/v1/", router);

app.listen(3000, () => console.log("running on port 3000"));
