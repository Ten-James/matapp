export interface TypeIngredient {
	id: number;
	name: string;
	cost: number;
	text: string;
	category: string;
	allergens: string;
}

export interface TypeBranch {
	id: number;
	name: string;
	location: string;
}
export interface TypeDish {
	id: number;
	name: string;
	cost: number;
	category: string;
	ingredients?: string[];
}
export interface TypeDishIngredient {
	name: string;
	line: number;
}

export interface TypeBranchStorageItem {
	id: number;
	name: string;
	category: string;
	count: number;
}

export interface TypeLoginProps {
	name: string;
	pass: string;
}

export interface TypeUser {
	name: string;
	id: number;
	branchId: number;
	access: number;
}

export interface TypeLogType {
	time: string;
	ip: string;
	message: string;
}
