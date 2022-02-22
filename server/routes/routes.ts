import express from "express";
import {
	createNewEntry,
	updateEntry,
	checkEditAccess,
	getEntry,
} from "../controllers/controller";

const router = express.Router();

router.route("/entry").post(createNewEntry).patch(updateEntry);
router.route("/entry/:link").get(getEntry);

router.route("/edit-access/:link/:password?").get(checkEditAccess);

export default router;
