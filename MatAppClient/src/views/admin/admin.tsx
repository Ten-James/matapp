import { context } from "../../App";
import { useContext, useEffect, useState, useRef, createContext, FormEvent } from "react";
import { Routes, Route } from "react-router-dom";

import InformationView from "./information/information";
import TableView from "./tableView/";
import Navigation from "./navigation";
import { GenerateFries } from "../../misc/fries";
import { AdminContextType, Ingredient, User, UserDisplay, DialogType, Branch } from "../../types";
import { AddDialog } from "./dialog";

const defaultData: AdminContextType = {
	selectedIDs: [],
	setSelectedIDs: () => {},
	refresh: () => {},
	dialog: "hidden",
	setDialog: () => {},
	branches: [],
	setBranches: () => {},
};

export const AdminContext = createContext(defaultData);

const Admin = () => {
	const setLoading = useContext(context).setLoading;
	const socket = useContext(context).socket;

	const [ingredients, setIngredients] = useState<Ingredient[]>([]);
	const [users, setUsers] = useState<UserDisplay[]>([]);
	const [branches, setBranches] = useState<Branch[]>([]);
	const [dialog, setDialog] = useState<DialogType>("hidden");

	const [selectedIDs, setSelectedIDs] = useState<number[]>([]);
	const [user, setUser] = useState<User>({
		id: 1,
		name: "admin",
		access: 2,
		branchId: 0,
	});
	const [Status, setStatus] = useState("");

	const refresh = () => {
		setSelectedIDs([]);
		setIngredients([]);
	};

	const nameRef = useRef<HTMLInputElement>(null);
	const passRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		GenerateFries();
		setTimeout(() => setLoading(false), 1000);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	socket.on("login", (data) => {
		if (data.status) {
			setUser(data.user);
		} else {
			setStatus("Wrong password or username");
		}
	});

	if (!user) {
		const Login = (e: FormEvent) => {
			e.preventDefault();
			if (!nameRef.current || !passRef.current) return;
			socket.emit("login", {
				name: nameRef.current.value,
				pass: passRef.current.value,
			});
		};
		return (
			<div className='App App-grid'>
				<Navigation userAccess={0} />
				<form onSubmit={Login}>
					<h1>Log in:</h1>
					<input ref={nameRef} type='text' placeholder='Branch Username' />
					<input ref={passRef} type='password' placeholder='Password' />
					<div>{Status}</div>
					<button>Log in</button>
				</form>
			</div>
		);
	}
	return (
		<AdminContext.Provider value={{ selectedIDs, setSelectedIDs, refresh, dialog, setDialog, branches, setBranches }}>
			{dialog === "add" && <AddDialog />}
			<div className='App App-grid'>
				<Navigation userAccess={user.access} />
				<Routes>
					<Route
						path='/branches'
						element={<TableView data={branches} setData={setBranches} displayName='Branches' socketString='branches' />}
					/>
					<Route
						path='table/ingredients'
						element={
							<TableView data={ingredients} setData={setIngredients} displayName='Ingredients' socketString='ingredients' />
						}
					/>
					<Route
						path='table/users'
						element={<TableView data={users} setData={setUsers} displayName='Users' socketString='users' />}
					/>
					<Route path='/information' element={<InformationView />} />
				</Routes>
			</div>
		</AdminContext.Provider>
	);
};
export default Admin;
