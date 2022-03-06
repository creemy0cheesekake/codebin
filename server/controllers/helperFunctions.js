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
exports.comparePassword = exports.hashPassword = exports.generateLink = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const Schema_1 = __importDefault(require("../schemas/Schema"));
const randomLinkChars = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
const generateLink = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let res = "";
        for (let i = 0; i < 6; i++)
            res += randomLinkChars.charAt(Math.random() * randomLinkChars.length);
        if (!!(yield Schema_1.default.findOne({ link: { $eq: res } })))
            return (0, exports.generateLink)();
        return res;
    }
    catch (err) {
        return err;
    }
});
exports.generateLink = generateLink;
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!password)
            return;
        const salt = yield bcrypt_1.default.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
        return bcrypt_1.default.hash(password, salt);
    }
    catch (err) {
        return err;
    }
});
exports.hashPassword = hashPassword;
const comparePassword = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () { return password && bcrypt_1.default.compare(password, hashedPassword); });
exports.comparePassword = comparePassword;
