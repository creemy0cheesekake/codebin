import React, { useState } from "react";
import "./styles/App.sass";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/solarized-dark.css";
import "codemirror/mode/javascript/javascript";
// @ts-ignore
import { Controlled } from "react-codemirror2";

function App() {
	const [wrap, setWrap] = useState(true);
	const [language, setLanguage] = useState("javascript");

	const [value, setValue] = useState("");
	return (
		<main>
			<Controlled
				onBeforeChange={(_: any, __: any, val: string) => setValue(val)}
				value={value}
				className="textarea"
				options={{
					lineWrapping: wrap,
					mode: language,
					lineNumbers: true,
					theme: "solarized",
				}}
			/>
			<MenuBar />
		</main>
	);
}

function MenuBar() {
	const [value, setValue] = useState("");
	return <div className="menu-bar">hi</div>;
}

export default App;
