import React, { useState, useContext } from "react";
import { Context } from "./Context";
const axios = require("axios").default;

function MenuBar() {
	const {
		language,
		setShowModal,
		link,
		value,
		setLink,
		setCanEdit,
		canEdit,
		hasPassword,
	} = useContext(Context);
	const [passwordVal, setPasswordVal] = useState("");
	const [linkBoxClicked, setLinkBoxClicked] = useState(false);

	const handleLinkClick = () => {
		navigator.clipboard.writeText(`${window.location.host}/${link}`);
		setLinkBoxClicked(true);
		setTimeout(() => setLinkBoxClicked(false), 3000);
	};

	const handleSubmitPassword = async () => {
		if (!passwordVal.replace(/\s/g, "").length) return setPasswordVal("");
		const password = await (
			await axios.get(process.env.REACT_APP_API_URL + "/entry/" + link)
		).data.entry.password;
		if (password) {
			const data = await (
				await axios.get(
					process.env.REACT_APP_API_URL +
						"/edit-access/" +
						link +
						"/" +
						passwordVal
				)
			).data;
			alert(data.message);
			setCanEdit(data.hasAccess);
		} else {
			const response = await axios.patch(
				process.env.REACT_APP_API_URL + "/entry",
				{
					link,
					password: passwordVal,
				}
			);
			if (response.data.success) alert("password set successfully");
			else alert(`err: ${response.data.message}`);
		}
	};

	const handleGetLink = async () => {
		const response = await axios.post(
			process.env.REACT_APP_API_URL + "/entry",
			{
				body: encodeURI(value),
			}
		);

		if (!response.data.success) return alert(response.data.message);
		setLink(`${response.data.link}`);
	};

	const handleSave = async () => {
		const response = await axios.patch(
			process.env.REACT_APP_API_URL + "/entry",
			{
				link,
				body: value,
			}
		);
		if (response.data.success) alert("saved successfully");
		else alert(`err: ${response.data.message}`);
	};

	return (
		<div className="menu-bar">
			<div className="language-selector-and-save">
				<button onClick={_ => setShowModal(true)}>
					Select Language
				</button>
				<span>Language: {language.toUpperCase()}</span>
				{!!link && (
					<button onClick={handleSave} className="save-file-button">
						Save File
					</button>
				)}
			</div>
			<div className="shareable-link-and-password">
				<div className="pw-indicators">
					<div
						className={
							"has-password " + (hasPassword ? "green" : "red")
						}
					>{`Has ${hasPassword ? "" : "no"} password`}</div>
					<div
						className={"can-edit " + (canEdit ? "green" : "red")}
					>{`Can ${canEdit ? "" : "not"} edit`}</div>
				</div>
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
								linkBoxClicked
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
