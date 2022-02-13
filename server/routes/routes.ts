import express from "express";
import {
	createNewEntry,
	updateEntry,
	checkEditAccess,
} from "../controllers/controller";

const router = express.Router();

router.route("/create-new-entry").post(createNewEntry);

router.route("/update-entry").patch(updateEntry);

router.route("/check-edit-access").post(checkEditAccess);

export default router;
