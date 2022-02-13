import { Request, Response } from "express";
import { generateLink } from "./helperFunctions";
import Schema from "../schemas/Schema";

export const createNewEntry = async (req: Request, res: Response) => {
	try {
		let link = await generateLink();
		while (!!(await Schema.findOne({ link: { $eq: link } })))
			link = await generateLink();
		const [password, body] = ["", "testBody"];
		const entry = new Schema({
			link,
			body,
		});
		entry.password = password || undefined;
		await entry.save();

		res.json({
			success: true,
			message: "user successfully created",
		});
	} catch ({ message }: any) {
		res.json({
			success: false,
			message,
		});
	}
};
