import crypto from "crypto";
import bcrypt from "bcrypt";

export const generateLink = () => crypto.randomBytes(3).toString("hex");

export const hashPassword = async (password: string | null) => {
	if (password === null) return;
	const salt = await bcrypt.genSalt(
		parseInt(<string>process.env.BCRYPT_SALT_ROUNDS)
	);
	return bcrypt.hash(password, salt);
};

export const comparePassword = async (
	password: string,
	hashedPassword: string
) => {
	return bcrypt.compare(password, hashedPassword);
};