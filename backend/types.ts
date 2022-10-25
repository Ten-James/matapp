export interface Ingredient {
	id: number;
	name: string;
	cost: number;
	text: string;
	category: string;
	allergens: string;
}

export interface LoginProps {
	name: string;
	pass: string;
}

export interface User {
	name: string;
	id: number;
	branchId: number;
	access: number;
}
