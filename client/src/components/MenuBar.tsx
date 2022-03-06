import { useState, useContext } from "react";
import { Context } from "./Context";
import {
	checkEditAccess,
	setEntryPassword,
	saveFile,
	getLink,
} from "../MenuBarFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFloppyDisk,
	faCircleArrowUp,
	faGear,
} from "@fortawesome/free-solid-svg-icons";
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
		setPasswordVal("");
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
				<button className="settings">
					<FontAwesomeIcon icon={faGear} />
				</button>
				<button onClick={_ => setShowModal(true)}>
					Lang<span className="large-screens">uage</span>:&nbsp;
					{language.toUpperCase()}
				</button>
				{!!link && (
					<button onClick={handleSave} className="save-file-button">
						<FontAwesomeIcon icon={faFloppyDisk} />
						&nbsp;Save<span className="large-screens"> File</span>
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
					<span className="password-box">
						<input
							type="text"
							value={passwordVal}
							onChange={e => setPasswordVal(e.target.value)}
							placeholder="password..."
							onKeyPress={e =>
								e.key === "Enter" && handleSubmitPassword()
							}
						/>
						<button onClick={handleSubmitPassword}>
							<FontAwesomeIcon
								icon={faCircleArrowUp}
								className="mid-screens"
							/>
							<span className="large-screens">Submit</span>
						</button>
					</span>
				)}
				{!link ? (
					<button onClick={handleGetLink}>Get Link</button>
				) : (
					<span className="link-box" onClick={handleLinkClick}>
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
						{`${window.location.host}/${link}`}
					</span>
				)}
			</div>
		</div>
	);
}
export default MenuBar;
