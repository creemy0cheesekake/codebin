"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes/routes"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL,
}));
app.use((_, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});
// if (process.env.NODE_ENV === "production")
app.use(express_1.default.static("../client/build"));
app.use(body_parser_1.default.json());
app.use("/api/v1/", routes_1.default);
const mongoURI = process.env.MONGO_URI;
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`running on port ${PORT}`));
mongoose_1.default.connect(mongoURI, () => {
    console.log("connected to mongoose");
});
