import { Socket } from "socket.io-client";
export interface Branch extends BaseProp {
	id: number;
	name: string;
	location: string;
}
export interface AppContext {
	loading: boolean;
	socket: Socket;
	branches: Branch[];
	setLoading: (loading: boolean) => void;
	setBranches: (branches: Branch[]) => void;
}

export type DialogType = "hidden" | "add" | "edit" | "edit_multiple" | "delete";

export interface AdminContextType {
	selectedIDs: number[];
	setSelectedIDs: (selectedIDs: number[]) => void;
	refresh: () => void;
	dialog: DialogType;
	setDialog: (dialog: DialogType) => void;
	branches: Branch[];
	setBranches: (branches: Branch[]) => void;
}

export interface Information {
	uptime: string;
	memory: string;
	clients: number;
	time: string;
	data: string[];
}
export interface FilterData<T extends BaseProp> {
	filterMatch: (x: T, index?: number) => boolean;
	sort: (x: T, y: T) => number;
}

export interface BaseProp {
	id: number;
}

export interface Ingredient extends BaseProp {
	id: number;
	name: string;
	text: string;
	category: string;
}

export interface User extends BaseProp {
	id: number;
	name: string;
	access: number;
	branchId: number;
}
export interface UserDisplay extends BaseProp {
	id: number;
	name: string;
	password: string;
	access: number;
	branchName: string;
	allergens: string;
}

export interface Sort {
	name: string;
	type: string;
}
