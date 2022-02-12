import React, { useState, createContext } from "react";
import "./styles/App.sass";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/solarized-dark.css";
import { Controlled } from "react-codemirror2";
import MenuBar from "./components/MenuBar";
import Modal from "./components/Modal";

import "codemirror/mode/all/apl";
import "codemirror/mode/all/factor";
import "codemirror/mode/all/markdown";
import "codemirror/mode/all/r";
import "codemirror/mode/all/toml";
import "codemirror/mode/all/asciiarmor";
import "codemirror/mode/all/fcl";
import "codemirror/mode/all/mathematica";
import "codemirror/mode/all/rpm";
import "codemirror/mode/all/tornado";
import "codemirror/mode/all/asn.1";
import "codemirror/mode/all/forth";
import "codemirror/mode/all/mbox";
import "codemirror/mode/all/rst";
import "codemirror/mode/all/troff";
import "codemirror/mode/all/asterisk";
import "codemirror/mode/all/fortran";
import "codemirror/mode/all/mirc";
import "codemirror/mode/all/ruby";
import "codemirror/mode/all/ttcn-cfg";
import "codemirror/mode/all/brainfuck";
import "codemirror/mode/all/gas";
import "codemirror/mode/all/mllike";
import "codemirror/mode/all/rust";
import "codemirror/mode/all/ttcn";
import "codemirror/mode/all/clike";
import "codemirror/mode/all/gfm";
import "codemirror/mode/all/modelica";
import "codemirror/mode/all/sas";
import "codemirror/mode/all/turtle";
import "codemirror/mode/all/clojure";
import "codemirror/mode/all/gherkin";
import "codemirror/mode/all/mscgen";
import "codemirror/mode/all/sass";
import "codemirror/mode/all/twig";
import "codemirror/mode/all/cmake";
import "codemirror/mode/all/go";
import "codemirror/mode/all/mumps";
import "codemirror/mode/all/scheme";
import "codemirror/mode/all/vb";
import "codemirror/mode/all/cobol";
import "codemirror/mode/all/groovy";
import "codemirror/mode/all/nginx";
import "codemirror/mode/all/shell";
import "codemirror/mode/all/vbscript";
import "codemirror/mode/all/coffeescript";
import "codemirror/mode/all/haml";
import "codemirror/mode/all/nsis";
import "codemirror/mode/all/sieve";
import "codemirror/mode/all/velocity";
import "codemirror/mode/all/commonlisp";
import "codemirror/mode/all/handlebars";
import "codemirror/mode/all/ntriples";
import "codemirror/mode/all/slim";
import "codemirror/mode/all/verilog";
import "codemirror/mode/all/crystal";
import "codemirror/mode/all/haskell";
import "codemirror/mode/all/octave";
import "codemirror/mode/all/smalltalk";
import "codemirror/mode/all/vhdl";
import "codemirror/mode/all/css";
import "codemirror/mode/all/haskell-literate";
import "codemirror/mode/all/oz";
import "codemirror/mode/all/smarty";
import "codemirror/mode/all/vue";
import "codemirror/mode/all/cypher";
import "codemirror/mode/all/haxe";
import "codemirror/mode/all/pascal";
import "codemirror/mode/all/solr";
import "codemirror/mode/all/wast";
import "codemirror/mode/all/dart";
import "codemirror/mode/all/htmlembedded";
import "codemirror/mode/all/pegjs";
import "codemirror/mode/all/soy";
import "codemirror/mode/all/webidl";
import "codemirror/mode/all/diff";
import "codemirror/mode/all/htmlmixed";
import "codemirror/mode/all/perl";
import "codemirror/mode/all/sparql";
import "codemirror/mode/all/xml";
import "codemirror/mode/all/django";
import "codemirror/mode/all/http";
import "codemirror/mode/all/php";
import "codemirror/mode/all/spreadsheet";
import "codemirror/mode/all/xquery";
import "codemirror/mode/all/d";
import "codemirror/mode/all/idl";
import "codemirror/mode/all/pig";
import "codemirror/mode/all/sql";
import "codemirror/mode/all/yacas";
import "codemirror/mode/all/dtd";
import "codemirror/mode/all/powershell";
import "codemirror/mode/all/stex";
import "codemirror/mode/all/yaml-frontmatter";
import "codemirror/mode/all/dylan";
import "codemirror/mode/all/javascript";
import "codemirror/mode/all/properties";
import "codemirror/mode/all/stylus";
import "codemirror/mode/all/yaml";
import "codemirror/mode/all/ebnf";
import "codemirror/mode/all/jinja2";
import "codemirror/mode/all/protobuf";
import "codemirror/mode/all/swift";
import "codemirror/mode/all/z80";
import "codemirror/mode/all/ecl";
import "codemirror/mode/all/jsx";
import "codemirror/mode/all/pug";
import "codemirror/mode/all/tcl";
import "codemirror/mode/all/eiffel";
import "codemirror/mode/all/julia";
import "codemirror/mode/all/puppet";
import "codemirror/mode/all/textile";
import "codemirror/mode/all/elm";
import "codemirror/mode/all/livescript";
import "codemirror/mode/all/python";
import "codemirror/mode/all/tiddlywiki";
import "codemirror/mode/all/erlang";
import "codemirror/mode/all/lua";
import "codemirror/mode/all/q";
import "codemirror/mode/all/tiki";

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
