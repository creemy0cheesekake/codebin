import { useContext, useEffect, useState } from "react";
import "./styles/App.sass";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/darcula.css";

import { Controlled } from "react-codemirror2";
import MenuBar from "./components/MenuBar";
import Modal from "./components/Modal";

import "codemirror/mode/apl/apl";
import "codemirror/mode/factor/factor";
import "codemirror/mode/markdown/markdown";
import "codemirror/mode/r/r";
import "codemirror/mode/toml/toml";
import "codemirror/mode/asciiarmor/asciiarmor";
import "codemirror/mode/fcl/fcl";
import "codemirror/mode/mathematica/mathematica";
import "codemirror/mode/rpm/rpm";
import "codemirror/mode/tornado/tornado";
import "codemirror/mode/asn.1/asn.1";
import "codemirror/mode/forth/forth";
import "codemirror/mode/mbox/mbox";
import "codemirror/mode/rst/rst";
import "codemirror/mode/troff/troff";
import "codemirror/mode/asterisk/asterisk";
import "codemirror/mode/fortran/fortran";
import "codemirror/mode/mirc/mirc";
import "codemirror/mode/ruby/ruby";
import "codemirror/mode/ttcn-cfg/ttcn-cfg";
import "codemirror/mode/brainfuck/brainfuck";
import "codemirror/mode/gas/gas";
import "codemirror/mode/mllike/mllike";
import "codemirror/mode/rust/rust";
import "codemirror/mode/ttcn/ttcn";
import "codemirror/mode/clike/clike";
import "codemirror/mode/gfm/gfm";
import "codemirror/mode/modelica/modelica";
import "codemirror/mode/sas/sas";
import "codemirror/mode/turtle/turtle";
import "codemirror/mode/clojure/clojure";
import "codemirror/mode/gherkin/gherkin";
import "codemirror/mode/mscgen/mscgen";
import "codemirror/mode/sass/sass";
import "codemirror/mode/twig/twig";
import "codemirror/mode/cmake/cmake";
import "codemirror/mode/go/go";
import "codemirror/mode/mumps/mumps";
import "codemirror/mode/scheme/scheme";
import "codemirror/mode/vb/vb";
import "codemirror/mode/cobol/cobol";
import "codemirror/mode/groovy/groovy";
import "codemirror/mode/nginx/nginx";
import "codemirror/mode/shell/shell";
import "codemirror/mode/vbscript/vbscript";
import "codemirror/mode/coffeescript/coffeescript";
import "codemirror/mode/haml/haml";
import "codemirror/mode/nsis/nsis";
import "codemirror/mode/sieve/sieve";
import "codemirror/mode/velocity/velocity";
import "codemirror/mode/commonlisp/commonlisp";
import "codemirror/mode/handlebars/handlebars";
import "codemirror/mode/ntriples/ntriples";
import "codemirror/mode/slim/slim";
import "codemirror/mode/verilog/verilog";
import "codemirror/mode/crystal/crystal";
import "codemirror/mode/haskell/haskell";
import "codemirror/mode/octave/octave";
import "codemirror/mode/smalltalk/smalltalk";
import "codemirror/mode/vhdl/vhdl";
import "codemirror/mode/css/css";
import "codemirror/mode/haskell-literate/haskell-literate";
import "codemirror/mode/oz/oz";
import "codemirror/mode/smarty/smarty";
import "codemirror/mode/vue/vue";
import "codemirror/mode/cypher/cypher";
import "codemirror/mode/haxe/haxe";
import "codemirror/mode/pascal/pascal";
import "codemirror/mode/solr/solr";
import "codemirror/mode/wast/wast";
import "codemirror/mode/dart/dart";
import "codemirror/mode/htmlembedded/htmlembedded";
import "codemirror/mode/pegjs/pegjs";
import "codemirror/mode/soy/soy";
import "codemirror/mode/webidl/webidl";
import "codemirror/mode/diff/diff";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/perl/perl";
import "codemirror/mode/sparql/sparql";
import "codemirror/mode/xml/xml";
import "codemirror/mode/django/django";
import "codemirror/mode/http/http";
import "codemirror/mode/php/php";
import "codemirror/mode/spreadsheet/spreadsheet";
import "codemirror/mode/xquery/xquery";
import "codemirror/mode/d/d";
import "codemirror/mode/idl/idl";
import "codemirror/mode/pig/pig";
import "codemirror/mode/sql/sql";
import "codemirror/mode/yacas/yacas";
import "codemirror/mode/dtd/dtd";
import "codemirror/mode/powershell/powershell";
import "codemirror/mode/stex/stex";
import "codemirror/mode/yaml-frontmatter/yaml-frontmatter";
import "codemirror/mode/dylan/dylan";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/properties/properties";
import "codemirror/mode/stylus/stylus";
import "codemirror/mode/yaml/yaml";
import "codemirror/mode/ebnf/ebnf";
import "codemirror/mode/jinja2/jinja2";
import "codemirror/mode/protobuf/protobuf";
import "codemirror/mode/swift/swift";
import "codemirror/mode/z80/z80";
import "codemirror/mode/ecl/ecl";
import "codemirror/mode/jsx/jsx";
import "codemirror/mode/pug/pug";
import "codemirror/mode/tcl/tcl";
import "codemirror/mode/eiffel/eiffel";
import "codemirror/mode/julia/julia";
import "codemirror/mode/puppet/puppet";
import "codemirror/mode/textile/textile";
import "codemirror/mode/elm/elm";
import "codemirror/mode/livescript/livescript";
import "codemirror/mode/python/python";
import "codemirror/mode/tiddlywiki/tiddlywiki";
import "codemirror/mode/erlang/erlang";
import "codemirror/mode/lua/lua";
import "codemirror/mode/q/q";
import "codemirror/mode/tiki/tiki";
import axios from "axios";
import { Context } from "./components/Context";

function App() {
	const {
		language,
		showLanguageSelectionModal,
		setLink,
		value,
		canEdit,
		setCanEdit,
		setValue,
		setHasPassword,
		setShowLanguageSelectionModal,
		setLanguage,
		showSettingsModal,
		setShowSettingsModal,
		wrap,
		setWrap,
	} = useContext(Context);

	const [langSelection, setLangSelection] = useState("");
	const [wrapSelection, setWrapSelection] = useState(false);
	const [fontSizeSelection, setFontSizeSelection] = useState("");
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
	const confirmLangSelection = (lang: string) => {
		setLanguage(lang.toLowerCase());
		setShowLanguageSelectionModal(false);
	};
	const confirmSettingsChange = () => {
		setWrap(wrapSelection);
		(
			document.querySelector(".CodeMirror-lines") as HTMLElement
		).style.fontSize = `${fontSizeSelection}px`;
		setShowSettingsModal(false);
	};

	const handleResetSettings = () => {
		setWrapSelection(false);
		setFontSizeSelection(
			window
				.getComputedStyle(document.querySelector("html")!, null)
				.getPropertyValue("font-size")
				.slice(0, -2)
		);
		(document.querySelector(".font-size>input") as HTMLInputElement).value =
			window
				.getComputedStyle(document.querySelector("html")!, null)
				.getPropertyValue("font-size")
				.slice(0, -2);
		// cant just use fontSizeSelection above because the value wont update until the component rerenders which doesnt happen until the function finishes
	};

	const getBodyFromLink = async () => {
		const entry = await (
			await axios.get(
				process.env.REACT_APP_API_URL +
					"/entry" +
					window.location.pathname
			)
		).data.entry;
		if (entry) setValue(decodeURI(entry.body));
		return entry;
	};

	const getEditAccessFromLink = async () => {
		return (
			await axios.get(
				process.env.REACT_APP_API_URL +
					"/edit-access" +
					window.location.pathname
			)
		).data.hasAccess;
	};

	useEffect(() => {
		(async () => {
			if (window.location.pathname === "/") return setCanEdit(true);
			const entry = await getBodyFromLink();
			if (!entry) window.location.href = "/";
			setHasPassword(!!entry.password);
			setLink(window.location.pathname.substring(1));
			setCanEdit(await getEditAccessFromLink());
		})().catch(err => alert(`err: ${err.message}`));
	}, []);

	return (
		<main>
			<Controlled
				onBeforeChange={(_, __, val: string) => setValue(val)}
				value={value}
				className="textarea"
				options={{
					lineWrapping: wrap,
					mode: language,
					lineNumbers: true,
					theme: "darcula",
					readOnly: !canEdit,
				}}
			/>
			<MenuBar />
			{showLanguageSelectionModal && (
				<Modal
					showModal={setShowLanguageSelectionModal}
					header={"Pick Language for Syntax Highlighting"}
					content={
						<div className="content-box-language-selector">
							{languages.map(el => (
								<div
									key={el}
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
					}
					footer={
						<>
							{/* prettier-ignore */}
							<button onClick={() => setShowLanguageSelectionModal(false)}>Cancel</button>
							{/* prettier-ignore */}
							<button onClick={() => confirmLangSelection(langSelection)}>Continue</button>
						</>
					}
				/>
			)}
			{showSettingsModal && (
				<Modal
					showModal={setShowSettingsModal}
					header={"Settings"}
					content={
						<div className="content-box-settings">
							<div className="line-wrap">
								Line wrapping:&nbsp;
								<button
									onClick={() =>
										setWrapSelection(!wrapSelection)
									}
								>
									<span className="wrap-on-off">
										<span
											className={`on ${
												wrapSelection ? "active" : ""
											}`}
										>
											On
										</span>
										<span
											className={`off ${
												!wrapSelection ? "active" : ""
											}`}
										>
											Off
										</span>
									</span>
								</button>
							</div>
							<div className="font-size">
								Font size:&nbsp;
								<input
									style={{ width: "7ch" }}
									type="number"
									min="8"
									max="30"
									onBlur={e => {
										e.target.value = `${Math.max(
											8,
											Math.min(+e.target.value, 30)
										)}`;
										setFontSizeSelection(e.target.value);
									}}
									defaultValue={window
										.getComputedStyle(
											document.querySelector(
												".CodeMirror-lines"
											)!,
											null
										)
										.getPropertyValue("font-size")
										.slice(0, -2)}
								/>
							</div>
							<button
								onClick={handleResetSettings}
								className="reset"
							>
								Reset to defaults
							</button>
						</div>
					}
					footer={
						<>
							{/* prettier-ignore */}
							<button onClick={() => setShowSettingsModal(false)}>Cancel</button>
							{/* prettier-ignore */}
							<button onClick={() => confirmSettingsChange()}>Confirm</button>
						</>
					}
				/>
			)}
		</main>
	);
}

export default App;
