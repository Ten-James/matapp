import React, { useState, createContext } from "react";
import { Routes, Route } from "react-router";
import socketIOClient from "socket.io-client";

import Loader from "./views/loading";
import BranchSelector from "./views/branchSelector";
import Admin from "./views/admin/admin";
import ErrorPage from "./views/errorPage";
import { Branch } from "./types";
import { AppContext, LanguageType } from "./types";
import { Button } from "./components/panel";
const socket = socketIOClient("http://localhost:2238");

export const context: React.Context<AppContext> = createContext<AppContext>({
	loading: true,
	socket: socket,
	language: "english",
	setLanguage: () => {},
	branches: [],
	setLoading: () => {},
	setBranches: () => {},
});

const App = () => {
	const [loading, setLoading] = useState(true);
	const [language, setLanguage] = useState<LanguageType>("english");
	//TODO- move to branchSelector
	const [branches, setBranches] = useState<Branch[]>([]);

	const contextValue: AppContext = {
		loading,
		socket,
		branches,
		language,
		setLanguage,
		setLoading: setLoading,
		setBranches: setBranches,
	};

	return (
		<context.Provider value={contextValue}>
			<Loader>
				<Routes>
					<Route path='/branches' element={<BranchSelector branches={branches} />} />
					<Route path='/admin/*' element={<Admin />} />
					<Route path='*' element={<ErrorPage />} />
				</Routes>
				{language === "english" ? (
					<Button class='lang-button' onClick={() => setLanguage("czech")}>
						EN
					</Button>
				) : (
					<Button class='lang-button' onClick={() => setLanguage("english")}>
						CZ
					</Button>
				)}
			</Loader>
		</context.Provider>
	);
};
export default App;
