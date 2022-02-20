import bcrypt from "bcrypt";

const randomLinkChars =
	"1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
export const generateLink = () => {
	let res = "";
	for (let i = 0; i < 6; i++)
		res += randomLinkChars.charAt(Math.random() * 62);
	return res;
};

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
