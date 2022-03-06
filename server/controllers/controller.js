"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEntry = exports.checkEditAccess = exports.updateEntry = exports.createNewEntry = void 0;
const helperFunctions_1 = require("./helperFunctions");
const Schema_1 = __importDefault(require("../schemas/Schema"));
const createNewEntry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let link = yield (0, helperFunctions_1.generateLink)();
        const { body } = req.body;
        yield Schema_1.default.create({
            link,
            body,
        });
        res.status(201).json({
            success: true,
            message: "entry successfully created",
            link,
        });
    }
    catch ({ message }) {
        res.status(500).json({
            success: false,
            message,
        });
    }
});
exports.createNewEntry = createNewEntry;
const updateEntry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, body } = req.body;
        const { link } = req.params;
        const entry = yield Schema_1.default.findOne({ link: { $eq: link } });
        if (password !== undefined)
            entry.password = yield (0, helperFunctions_1.hashPassword)(password);
        if (body)
            entry.body = body;
        entry.save();
        res.status(204).json({
            success: true,
            message: "entry successfully updated",
        });
    }
    catch ({ message }) {
        res.status(500).json({
            success: false,
            message,
        });
    }
});
exports.updateEntry = updateEntry;
const checkEditAccess = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { link, password } = req.params;
        const entry = yield Schema_1.default.findOne({ link: { $eq: link } });
        const hasAccess = (yield (0, helperFunctions_1.comparePassword)(password, entry.password)) ||
            !entry.password;
        res.status(200).json({
            success: true,
            hasAccess,
            message: `edit access${hasAccess ? "" : " not"} granted`,
        });
    }
    catch ({ message }) {
        res.status(500).json({
            success: false,
            message,
        });
    }
});
exports.checkEditAccess = checkEditAccess;
const getEntry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { link } = req.params;
        const entry = yield Schema_1.default.findOne({ link: { $eq: link } });
        res.status(200).json({
            success: true,
            entry,
            message: `entry${entry ? "" : " not"} found`,
        });
    }
    catch ({ message }) {
        res.status(500).json({
            success: false,
            message,
        });
    }
});
exports.getEntry = getEntry;
