import crypto from "crypto";

export const generateLink = async () => {
	return crypto.randomBytes(3).toString("hex");
};
