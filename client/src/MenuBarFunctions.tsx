const axios = require("axios").default;

export const checkEditAccess = async (link: string, passwordVal: string) => {
	const data = await (
		await axios.get(
			process.env.REACT_APP_API_URL +
				"/edit-access/" +
				link +
				"/" +
				passwordVal
		)
	).data;
	return [data.message, data.hasAccess];
};

export const setEntryPassword = async (link: string, passwordVal: string) => {
	const response = await axios.patch(
		process.env.REACT_APP_API_URL + "/entry/" + link,
		{
			password: passwordVal,
		}
	);
	return [response.data.message, response.data.success];
};

export const getLink = async (value: string) => {
	const response = await axios.post(
		process.env.REACT_APP_API_URL + "/entry",
		{ body: encodeURI(value) }
	);
	return [response.data.message, response.data.success, response.data.link];
};

export const saveFile = async (link: string, value: string) => {
	const response = await axios.patch(
		process.env.REACT_APP_API_URL + "/entry/" + link,
		{ body: value }
	);
	return [response.data.msg, response.data.success];
};
