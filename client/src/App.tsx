import React, { useState, createContext } from "react";
import "./styles/App.sass";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/solarized-dark.css";
import { Controlled } from "react-codemirror2";
import MenuBar from "./components/MenuBar";
import Modal from "./components/Modal";
import "@codemirror/language-data";

export const Context = createContext({});

function App() {
	const [wrap, setWrap] = useState(true);
	const [language, setLanguage] = useState("javascript");
	const [showModal, setShowModal] = useState(false);

	const [value, setValue] = useState("");
	return (
		<main>
			<Context.Provider
				value={{
					wrap,
					setWrap,
					language,
					setLanguage,
					showModal,
					setShowModal,
				}}
			>
				<Controlled
					onBeforeChange={(_: any, __: any, val: string) =>
						setValue(val)
					}
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
				{showModal && <Modal />}
			</Context.Provider>
		</main>
	);
}

export default App;
