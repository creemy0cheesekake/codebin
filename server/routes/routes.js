"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controllers/controller");
const router = express_1.default.Router();
router
    .route("/entry/:link?")
    .get(controller_1.getEntry)
    .post(controller_1.createNewEntry)
    .patch(controller_1.updateEntry);
router.route("/edit-access/:link/:password?").get(controller_1.checkEditAccess);
exports.default = router;
