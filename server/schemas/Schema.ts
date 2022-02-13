import mongoose from "mongoose";

const Schema = new mongoose.Schema({
	link: {
		type: String,
		immutable: true,
	},
	body: {
		type: String,
		required: [true, "body is empty"],
	},
	password: {
		type: String,
	},
});

export default mongoose.model("Schema", Schema);
