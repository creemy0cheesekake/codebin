import { useState, createContext, useEffect } from "react";
import "./styles/App.sass";
import "codemirror/lib/codemirror.css";
import "./styles/solarized-dark-theme.css";

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

export const Context: any = createContext(undefined);

function App() {
	const [value, setValue] = useState("");
	const [wrap, setWrap] = useState(true);
	const [language, setLanguage] = useState("javascript");
	const [showModal, setShowModal] = useState(false);
	const [link, setLink] = useState("");
	const [canEdit, setCanEdit] = useState(false);
	const [hasPassword, setHasPassword] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				if (window.location.pathname === "/") return setCanEdit(true);
				else {
					const entry = await (
						await axios.get(
							process.env.REACT_APP_API_URL +
								"/get-entry" +
								window.location.pathname
						)
					).data.entry;
					if (entry) setValue(decodeURI(entry.body));
					else window.location.href = "/";
					if (entry.password) setHasPassword(true);
					setLink(window.location.pathname.substring(1));
					let hasEditAccess = await (
						await axios.get(
							process.env.REACT_APP_API_URL +
								"/check-edit-access" +
								window.location.pathname
						)
					).data.hasAccess;
					setCanEdit(hasEditAccess);
				}
			} catch (err: any) {
				alert(`err: ${err.message}`);
			}
		})();
	}, []);

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
					link,
					setLink,
					value,
					canEdit,
					setCanEdit,
					hasPassword,
				}}
			>
				<Controlled
					onBeforeChange={(_, __, val: string) => setValue(val)}
					value={value}
					className="textarea"
					options={{
						lineWrapping: wrap,
						mode: language,
						lineNumbers: true,
						theme: "solarized",
						readOnly: !canEdit,
					}}
				/>
				<MenuBar />
				{showModal && <Modal />}
			</Context.Provider>
		</main>
	);
}

export default App;
