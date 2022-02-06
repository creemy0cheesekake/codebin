import React from "react";
import "./styles/App.sass";

function App() {
	return (
		<main>
			<div className="line-numbers">hi</div>
			<textarea
				spellCheck="false"
				placeholder="Paste your code here..."
				className="text-box"
			></textarea>
		</main>
	);
}

export default App;
