import express from "express";
import {
	createNewEntry,
	updateEntry,
	checkEditAccess,
	getEntry,
} from "../controllers/controller";

const router = express.Router();

router
	.route("/entry/:link?")
	.get(getEntry)
	.post(createNewEntry)
	.patch(updateEntry);

router.route("/edit-access/:link/:password?").get(checkEditAccess);

export default router;
