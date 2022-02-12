import React, { useState, useContext } from "react";
import { Context } from "../App";

function MenuBar() {
	const { language, setShowModal }: any = useContext(Context);
	const [link, setLink] = useState("");
	return (
		<div className="menu-bar">
			<div className="language-selector-and-save">
				<button onClick={_ => setShowModal(true)}>
					Select Language
				</button>
				<span>Language: {language.toUpperCase()}</span>
				<button>Save</button>
			</div>
			<div className="shareable-link">
				{!link ? (
					<button>Get Link</button>
				) : (
					<span className="link-box">{link}</span>
				)}
			</div>
		</div>
	);
}
export default MenuBar;
