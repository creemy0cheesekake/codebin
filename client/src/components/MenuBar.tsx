import React, { useState, useContext } from "react";
import { Context } from "../App";
const axios = require("axios").default;

function MenuBar() {
	const { language, setShowModal, link, value, setLink, setCanEdit }: any =
		useContext(Context);
	const [passwordVal, setPasswordVal] = useState("");
	const [linkBoxActive, setLinkBoxActive] = useState(false);

	const handleLinkClick = (
		e: React.MouseEvent<HTMLSpanElement, MouseEvent>
	) => {
		navigator.clipboard.writeText(link);
		setLinkBoxActive(true);
		setTimeout(() => setLinkBoxActive(false), 3000);
	};

	const handleSubmitPassword = async () => {
		const password = await (
			await axios.get(
				process.env.REACT_APP_API_URL + "/get-entry/" + link
			)
		).data.entry.password;
		if (password) {
			const data = await (
				await axios.get(
					process.env.REACT_APP_API_URL +
						"/check-edit-access/" +
						link +
						"/" +
						passwordVal
				)
			).data;
			alert(data.message);
			setCanEdit(data.hasAccess);
		} else {
			const response = await axios.patch(
				process.env.REACT_APP_API_URL + "/update-entry",
				{
					link,
					password: passwordVal,
				}
			);
			console.log(response);
			if (response.data.success) alert("password set successfully");
			else alert(`err: ${response.data.message}`);
		}
	};

	const handleGetLink = async () => {
		const response = await axios.post(
			process.env.REACT_APP_API_URL + "/create-new-entry",
			{
				body: encodeURI(value),
			}
		);

		if (!response.data.success) return alert(response.data.message);
		setLink(`${response.data.link}`);
	};

	return (
		<div className="menu-bar">
			<div className="language-selector-and-save">
				<button onClick={_ => setShowModal(true)}>
					Select Language
				</button>
				<span>Language: {language.toUpperCase()}</span>
				{!!link && (
					<button className="save-file-button">Save File</button>
				)}
			</div>
			<div className="shareable-link-and-password">
				{!!link && (
					<>
						<input
							type="text"
							value={passwordVal}
							onChange={e => setPasswordVal(e.target.value)}
							placeholder="password..."
						/>
						<button
							className="submit-password"
							onClick={handleSubmitPassword}
						>
							Submit
						</button>
					</>
				)}
				{!link ? (
					<button onClick={handleGetLink}>Get Link</button>
				) : (
					<>
						<span
							className="link-box-active"
							style={
								linkBoxActive
									? {
											opacity: 1,
											marginTop: "-30px",
									  }
									: {}
							}
						>
							Copied!
						</span>
						<span className="link-box" onClick={handleLinkClick}>
							{`${window.location.host}/${link}`}
						</span>
					</>
				)}
			</div>
		</div>
	);
}
export default MenuBar;
