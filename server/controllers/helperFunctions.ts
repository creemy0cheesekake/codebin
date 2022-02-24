import bcrypt from "bcrypt";
import Schema from "../schemas/Schema";

const randomLinkChars =
	"1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM" as const;
export const generateLink: any = async () => {
	let res = "";
	for (let i = 0; i < 6; i++)
		res += randomLinkChars.charAt(Math.random() * randomLinkChars.length);
	if (!!(await Schema.findOne({ link: { $eq: res } }))) return generateLink();
	return res;
};

export const hashPassword = async (password: string | null) => {
	if (!password) return;
	const salt = await bcrypt.genSalt(
		parseInt(<string>process.env.BCRYPT_SALT_ROUNDS)
	);
	return bcrypt.hash(password, salt);
};

export const comparePassword = async (
	password: string,
	hashedPassword: string
) => password && bcrypt.compare(password, hashedPassword);
