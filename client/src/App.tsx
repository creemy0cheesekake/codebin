import React, { createContext, useState } from "react";
import "./styles/App.sass";
import Textarea from "./components/Textarea";
import LineNumbers from "./components/LineNumbers";

export const Context: React.Context<any> = createContext({});

function App() {
	const [value, setValue] = useState("");
	return (
		<main>
			<Context.Provider value={{ value, setValue }}>
				<LineNumbers />
				<Textarea tabChar="&#9;" />
			</Context.Provider>
		</main>
	);
}

export default App;
