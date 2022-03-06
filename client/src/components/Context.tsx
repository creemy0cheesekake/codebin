import { createContext, useState } from "react";

export const Context: any = createContext(undefined);

function ContextProvider({ children }: any) {
	const [value, setValue] = useState("");
	const [language, setLanguage] = useState("javascript");
	// prettier-ignore
	const [showLanguageSelectionModal, setShowLanguageSelectionModal] = useState(false);
	const [showSettingsModal, setShowSettingsModal] = useState(false);
	const [link, setLink] = useState("");
	const [canEdit, setCanEdit] = useState(false);
	const [hasPassword, setHasPassword] = useState(false);
	const [wrap, setWrap] = useState(false);

	return (
		<main>
			<Context.Provider
				value={{
					language,
					setLanguage,
					showLanguageSelectionModal,
					setShowLanguageSelectionModal,
					showSettingsModal,
					setShowSettingsModal,
					link,
					setLink,
					value,
					canEdit,
					setCanEdit,
					hasPassword,
					setValue,
					setHasPassword,
					wrap,
					setWrap,
				}}
			>
				{children}
			</Context.Provider>
		</main>
	);
}

export default ContextProvider;
