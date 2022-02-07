import React, { useContext } from "react";
import { Context } from "../App";
import "../styles/LineNumbers.sass";

const LineNumbers = () => {
	const { value } = useContext(Context);
	const lineNumbersArr = [];

	for (let i = 1; i <= value.split("\n").length; i++) {
		lineNumbersArr.push(i);
	}

	return (
		<div className="line-numbers">
			{lineNumbersArr.map((num: number) => (
				<div>{num}</div>
			))}
		</div>
	);
};

export default LineNumbers;
