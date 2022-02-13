import { Request, Response } from "express";
// @ts-ignore
import { generateLink, hashPassword, comparePassword } from "./helperFunctions";
import Schema from "../schemas/Schema";

export const createNewEntry = async (req: Request, res: Response) => {
	try {
		let link = generateLink();
		while (!!(await Schema.findOne({ link: { $eq: link } })))
			link = generateLink();
		const { password, body } = req.body;
		await Schema.create({
			link,
			body,
			password: await hashPassword(password),
		});

		res.json({
			success: true,
			message: "entry successfully created",
		});
	} catch ({ message }: any) {
		res.json({
			success: false,
			message,
		});
	}
};

export const updateEntry = async (req: Request, res: Response) => {
	try {
		const { link, password, body } = req.body;

		const entry = await Schema.findOne({ link: { $eq: link } });

		// if password is null it will delete password. if password is undefined then it wont change
		entry.password =
			password !== undefined
				? await hashPassword(password)
				: entry.password;
		entry.body = body;
		entry.save();

		res.json({
			success: true,
			message: "entry successfully updated",
		});
	} catch ({ message }: any) {
		res.json({
			success: false,
			message,
		});
	}
};

export const checkEditAccess = async (req: Request, res: Response) => {
	try {
		const { link, password } = req.body;

		const entry = await Schema.findOne({ link: { $eq: link } });

		const hasAccess =
			(await comparePassword(password, entry.password)) || true;

		res.json({
			success: true,
			hasAccess,
			message: `user ${hasAccess ? "has" : "doesn't have"} edit access`,
		});
	} catch ({ message }: any) {
		res.json({
			success: false,
			message,
		});
	}
};
