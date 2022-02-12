import React, { useContext, useState } from "react";
import "../styles/Modal.sass";

import { Context } from "../App";

const Modal = () => {
	const languages = [
		"APL",
		"ASCIIARMOR",
		"ASN.1",
		"ASTERISK",
		"BRAINFUCK",
		"CLIKE",
		"CLOJURE",
		"CMAKE",
		"COBOL",
		"COFFEESCRIPT",
		"COMMONLISP",
		"CRYSTAL",
		"CSS",
		"CYPHER",
		"D",
		"DART",
		"DIFF",
		"DJANGO",
		"DOCKERFILE",
		"DTD",
		"DYLAN",
		"EBNF",
		"ECL",
		"EIFFEL",
		"ELM",
		"ERLANG",
		"FACTOR",
		"FCL",
		"FORTH",
		"FORTRAN",
		"GAS",
		"GFM",
		"GHERKIN",
		"GO",
		"GROOVY",
		"HAML",
		"HANDLEBARS",
		"HASKELL",
		"HASKELL-LITERATE",
		"HAXE",
		"HTML",
		"HTMLEMBEDDED",
		"HTMLMIXED",
		"HTTP",
		"IDL",
		"JAVASCRIPT",
		"JINJA2",
		"JSX",
		"JULIA",
		"LIVESCRIPT",
		"LUA",
		"MARKDOWN",
		"MATHEMATICA",
		"MBOX",
		"MIRC",
		"MLLIKE",
		"MODELICA",
		"MSCGEN",
		"MUMPS",
		"NGINX",
		"NSIS",
		"NTRIPLES",
		"OCTAVE",
		"OZ",
		"PASCAL",
		"PEGJS",
		"PERL",
		"PHP",
		"PIG",
		"POWERSHELL",
		"PROPERTIES",
		"PROTOBUF",
		"PUG",
		"PUPPET",
		"PYTHON",
		"Q",
		"R",
		"RPM",
		"RST",
		"RUBY",
		"RUST",
		"SAS",
		"SASS",
		"SCHEME",
		"SHELL",
		"SIEVE",
		"SLIM",
		"SMALLTALK",
		"SMARTY",
		"SOLR",
		"SOY",
		"SPARQL",
		"SPREADSHEET",
		"SQL",
		"STEX",
		"STYLUS",
		"SWIFT",
		"TCL",
		"TEXTILE",
		"TIDDLYWIKI",
		"TIKI",
		"TOML",
		"TORNADO",
		"TROFF",
		"TTCN",
		"TTCN-CFG",
		"TURTLE",
		"TWIG",
		"VB",
		"VBSCRIPT",
		"VELOCITY",
		"VERILOG",
		"VHDL",
		"VUE",
		"WAST",
		"WEBIDL",
		"XML",
		"XQUERY",
		"YACAS",
		"YAML",
		"YAML-FRONTMATTER",
		"Z80",
	];

	const { setShowModal, setLanguage }: any = useContext(Context);

	const confirmLangSelection = (lang: string) => {
		setLanguage(lang.toLowerCase());
		setShowModal(false);
	};
	const [langSelection, setLangSelection] = useState("");

	return (
		<div className="modal-background">
			<div className="modal-container">
				<div className="row x">
					<button onClick={() => setShowModal(false)}>X</button>
				</div>
				<div className="row header">
					<h1 className="modal-header">
						Pick Language for Syntax Highlighting
					</h1>
				</div>
				<div className="row content">
					<div className="content-box">
						{languages.map(el => (
							<div
								className={
									"lang " +
									(langSelection === el ? "active" : "")
								}
								onClick={() => setLangSelection(el)}
							>
								{el}
							</div>
						))}
					</div>
				</div>
				<div className="row footer">
					<button onClick={() => setShowModal(false)}>Cancel</button>
					<button onClick={() => confirmLangSelection(langSelection)}>
						Continue
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
