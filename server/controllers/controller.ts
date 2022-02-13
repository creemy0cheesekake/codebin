import { Request, Response } from "express";
import { generateLink } from "./helperFunctions";
import Schema from "../schemas/Schema";

export const createNewEntry = async (req: Request, res: Response) => {
	try {
		let link = await generateLink();
		while (!!(await Schema.findOne({ link: { $eq: link } })))
			link = await generateLink();
		const { password, body } = req.body;
		await Schema.create({
			link,
			body,
			password,
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
