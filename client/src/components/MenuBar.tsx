import React, { useState, useContext } from "react";
import { Context } from "../App";

function MenuBar() {
	const { language, setShowModal, link }: any = useContext(Context);
	const [passwordVal, setPasswordVal] = useState("");
	const [linkBoxActive, setLinkBoxActive] = useState(false);

	const handleLinkClick = (
		e: React.MouseEvent<HTMLSpanElement, MouseEvent>
	) => {
		navigator.clipboard.writeText(link);
		setLinkBoxActive(true);
		setTimeout(() => setLinkBoxActive(false), 3000);
	};

	return (
		<div className="menu-bar">
			<div className="language-selector-and-save">
				<button onClick={_ => setShowModal(true)}>
					Select Language
				</button>
				<span>Language: {language.toUpperCase()}</span>
				<button>Save</button>
			</div>
			<div className="shareable-link-and-password">
				<button>Submit Password</button>
				<input
					type="text"
					value={passwordVal}
					onChange={e => setPasswordVal(e.target.value)}
					placeholder="password..."
				/>
				{!link ? (
					<button>Get Link</button>
				) : (
					<>
						<span
							className="link-box-active"
							style={{
								opacity: linkBoxActive ? 1 : 0,
								marginTop: linkBoxActive ? "-30px" : 0,
							}}
						>
							Copied!
						</span>
						<span className={"link-box"} onClick={handleLinkClick}>
							{link}
						</span>
					</>
				)}
			</div>
		</div>
	);
}
export default MenuBar;
