import { createContext, useState } from "react";

export const Context: any = createContext(undefined);

function ContextProvider({ children }: any) {
	const [value, setValue] = useState("");
	const [language, setLanguage] = useState("javascript");
	const [showModal, setShowModal] = useState(false);
	const [link, setLink] = useState("");
	const [canEdit, setCanEdit] = useState(false);
	const [hasPassword, setHasPassword] = useState(false);

	return (
		<main>
			<Context.Provider
				value={{
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
					setValue,
					setHasPassword,
				}}
			>
				{children}
			</Context.Provider>
		</main>
	);
}

export default ContextProvider;
