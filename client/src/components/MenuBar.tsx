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
	faArrowTurnDown,
	faGear,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
const axios = require("axios").default;

function MenuBar() {
	const {
		language,
		setShowLanguageSelectionModal,
		link,
		value,
		setLink,
		setCanEdit,
		canEdit,
		hasPassword,
		setHasPassword,
		setShowSettingsModal,
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
		try {
			const newLink = await getLink(value, language);
			setLink(newLink);
			window.location.href = `http://${window.location.host}/${newLink}`;
		} catch (err: any) {
			alert(err.response.data.message);
		}
	};

	const handleSave = async () => {
		const [msg, success] = await saveFile(link, value, language);
		if (success) alert("saved successfully");
		else alert(`err: ${msg}`);
	};

	return (
		<div className="menu-bar">
			<div className="language-selector-and-save">
				<button
					className="icon-links settings"
					onClick={_ => setShowSettingsModal(true)}
				>
					<FontAwesomeIcon icon={faGear} />
				</button>
				<button className="icon-links github">
					<a href="https://github.com/creemy0cheesekake/codebin/">
						<FontAwesomeIcon icon={faGithub} />
					</a>
				</button>
				<button onClick={_ => setShowLanguageSelectionModal(true)}>
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
			<div className="pw-indicators">
				<div
					className={
						"has-password " + (hasPassword ? "green" : "red")
					}
				>{`${hasPassword ? "P" : "Not p"}assword protected`}</div>
				<div
					className={"can-edit " + (canEdit ? "green" : "red")}
				>{`Can${canEdit ? "" : "not"} edit`}</div>
			</div>
			<div className="shareable-link-and-password">
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
								icon={faArrowTurnDown}
								className="mid-screens"
								rotation={90}
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
