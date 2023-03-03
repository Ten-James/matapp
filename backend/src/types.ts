export * from '../../src/types';

export interface IDishIngredient {
  name: string;
  line: number;
}

export interface IBranchStorageItem {
  id: number;
  name: string;
  category: string;
  recommendedCount: number;
  count: number;
}

export interface ILoginProps {
  name: string;
  pass: string;
}

export interface ILogType {
  time: string;
  ip: string;
  message: string;
}

export interface IDialogBranch {
  id?: number[];
  name: string;
  location: string;
  size: number;
}

export interface IDialogUser {
  id?: number[];
  name: string;
  password: string;
  access: number;
  branch: number;
}

export interface IDialogIngredient {
  id?: number[];
  name: string;
  category: string;
  cost: number;
  text: string;
  text_combo: string;
  recommendedCount: number;
  allergens: number[];
}

export interface IDialogDishCategory {
  data: {};
}

export interface IDialogDish {
  id?: number[];
  name: string;
  category: string;
  cost: number;
  ingredients: string[][];
}

export interface IDialogStorage {
  id: number[];
  data: {};
}
