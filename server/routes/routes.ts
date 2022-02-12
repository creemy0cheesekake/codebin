import express from "express";
import { sayHi } from "../controllers/controller";

const router = express.Router();

router.route("/*").get(sayHi);

export default router;
