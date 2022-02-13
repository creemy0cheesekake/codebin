import express from "express";
import { createNewEntry } from "../controllers/controller";

const router = express.Router();

router.route("/create-new-entry").post(createNewEntry);

export default router;
