import crypto from "crypto";

export const generateLink = () => crypto.randomBytes(3).toString("hex");
