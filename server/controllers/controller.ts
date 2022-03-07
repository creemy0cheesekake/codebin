import { Request, Response } from "express";
import { generateLink, hashPassword, comparePassword } from "./helperFunctions";
import Schema from "../schemas/Schema";

export const createNewEntry = async (req: Request, res: Response) => {
	try {
		let link = await generateLink();
		const { body, lang } = req.body;
		await Schema.create({
			link,
			body,
			lang,
		});
		res.status(201).json({
			success: true,
			message: "entry successfully created",
			link,
		});
	} catch ({ message }: any) {
		res.status(400).json({
			success: false,
			message,
		});
	}
};

export const updateEntry = async (req: Request, res: Response) => {
	try {
		const { password, body, lang } = req.body;
		const { link } = req.params;

		const entry = await Schema.findOne({ link: { $eq: link } });

		if (password !== undefined)
			entry.password = await hashPassword(password);

		if (body) entry.body = body;
		if (lang) entry.lang = lang;
		entry.save();

		res.status(204).json({
			success: true,
			message: "entry successfully updated",
		});
	} catch ({ message }: any) {
		res.status(500).json({
			success: false,
			message,
		});
	}
};

export const checkEditAccess = async (req: Request, res: Response) => {
	try {
		const { link, password } = req.params;

		const entry = await Schema.findOne({ link: { $eq: link } });

		const hasAccess =
			(await comparePassword(password, entry.password)) ||
			!entry.password;

		res.status(200).json({
			success: true,
			hasAccess,
			message: `edit access${hasAccess ? "" : " not"} granted`,
		});
	} catch ({ message }: any) {
		res.status(500).json({
			success: false,
			message,
		});
	}
};

export const getEntry = async (req: Request, res: Response) => {
	try {
		const { link } = req.params;

		const entry = await Schema.findOne({ link: { $eq: link } });

		res.status(200).json({
			success: true,
			entry,
			message: `entry${entry ? "" : " not"} found`,
		});
	} catch ({ message }: any) {
		res.status(500).json({
			success: false,
			message,
		});
	}
};
