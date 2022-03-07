import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/globals.sass";
import ContextProvider from "./components/Context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

ReactDOM.render(
	<React.StrictMode>
		<ContextProvider>
			<Router>
				<Routes>
					<Route path="*" element={<App />} />
				</Routes>
			</Router>
		</ContextProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
