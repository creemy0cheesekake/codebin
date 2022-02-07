import React, { useContext } from "react";
import "../styles/App.sass";

import { Context } from "../App";

interface Props {
	tabChar: string;
}

function Textarea({ tabChar }: Props) {
	const { value, setValue } = useContext(Context);
	return (
		<textarea
			spellCheck="false"
			placeholder="Paste your code here..."
			className="text-box"
			wrap="off"
			value={value}
			onChange={e => {
				e.preventDefault();
				setValue(e.target.value);
			}}
			onKeyDown={e => {
				if (e.key === "Tab") {
					e.preventDefault();
					setValue(value + tabChar);
				}
			}}
		></textarea>
	);
}

export default Textarea;
