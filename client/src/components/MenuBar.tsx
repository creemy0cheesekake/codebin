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
			await axios.get(process.env.REACT_APP_API_URL + "/get-entry", {
				link,
			})
		).data.password;
		if (password) {
			const data = await (
				await axios.post(
					process.env.REACT_APP_API_URL + "/check-edit-access",
					{
						link,
						password: passwordVal,
					}
				)
			).data;
			alert(data.message);
			setCanEdit(data.hasAccess);
		} else {
			const data = await axios.patch(
				process.env.REACT_APP_API_URL + "/update-entry",
				{
					link,
					password: passwordVal,
				}
			);
			if (data.response.success) alert("password set successfully");
			else alert(`err: ${data.response.message}`);
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
		setLink(`${window.location.host}/${response.data.link}`);
	};

	return (
		<div className="menu-bar">
			<div className="language-selector-and-save">
				<button onClick={_ => setShowModal(true)}>
					Select Language
				</button>
				<span>Language: {language.toUpperCase()}</span>
				{!!link && <button>Save</button>}
			</div>
			<div className="shareable-link-and-password">
				{!!link && (
					<>
						<button onClick={handleSubmitPassword}>
							Submit Password
						</button>
						<input
							type="text"
							value={passwordVal}
							onChange={e => setPasswordVal(e.target.value)}
							placeholder="password..."
						/>
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
							{link}
						</span>
					</>
				)}
			</div>
		</div>
	);
}
export default MenuBar;
