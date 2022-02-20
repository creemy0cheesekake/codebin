import express from "express";
import {
	createNewEntry,
	updateEntry,
	checkEditAccess,
	getEntry,
} from "../controllers/controller";

const router = express.Router();

router.route("/create-new-entry").post(createNewEntry);

router.route("/update-entry").patch(updateEntry);

router.route("/check-edit-access").post(checkEditAccess);

router.route("/get-entry/:link").get(getEntry);

export default router;
