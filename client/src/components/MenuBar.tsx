import { useState, useContext } from "react";
import { Context } from "./Context";
import {
	checkEditAccess,
	setEntryPassword,
	saveFile,
	getLink,
} from "../MenuBarFunctions";
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
		setHasPassword,
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

		setHasPassword(
			await (async () =>
				!!(await (
					await axios.get(
						process.env.REACT_APP_API_URL + "/entry/" + link
					)
				).data.entry.password))()
		);

		if (hasPassword) {
			const [msg, hasAccess] = await checkEditAccess(link, passwordVal);
			alert(msg);
			setCanEdit(hasAccess);
		} else {
			const [msg, success] = await setEntryPassword(link, passwordVal);
			if (success) {
				alert("password set successfully");
				setPasswordVal(passwordVal);
			} else alert(`err: ${msg}`);
		}
	};

	const handleGetLink = async () => {
		const [msg, success, newLink] = await getLink(value);
		if (!success) return alert(msg);
		setLink(newLink);
	};

	const handleSave = async () => {
		const [msg, success] = await saveFile(link, value);
		if (success) alert("saved successfully");
		else alert(`err: ${msg}`);
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
