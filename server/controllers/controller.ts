import { Request, Response } from "express";
// @ts-ignore
import { generateLink, hashPassword, comparePassword } from "./helperFunctions";
import Schema from "../schemas/Schema";
import { Model } from "mongoose";

export const createNewEntry = async (req: Request, res: Response) => {
	try {
		let link = generateLink();
		while (!!(await Schema.findOne({ link: { $eq: link } })))
			link = generateLink();
		const { body } = req.body;
		await Schema.create({
			link,
			body,
		});

		res.json({
			success: true,
			message: "entry successfully created",
			link,
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
		const { link, password } = req.params;

		const entry = await Schema.findOne({ link: { $eq: link } });

		const hasAccess =
			(await comparePassword(password, entry.password)) ||
			!entry.password;

		res.json({
			success: true,
			hasAccess,
			message: `edit access${hasAccess ? "" : " not"} granted`,
		});
	} catch ({ message }: any) {
		res.json({
			success: false,
			message,
		});
	}
};

export const getEntry = async (req: Request, res: Response) => {
	try {
		const { link } = req.params;

		const entry: Model<any> | null = await Schema.findOne({
			link: { $eq: link },
		});

		res.json({
			success: true,
			entry,
			message: `entry${entry ? "" : " not"} found`,
		});
	} catch ({ message }: any) {
		res.json({
			success: false,
			message,
		});
	}
};
