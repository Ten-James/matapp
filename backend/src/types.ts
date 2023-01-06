export * from '../../src/types';

export interface IDishIngredient {
  name: string;
  line: number;
}

export interface IBranchStorageItem {
  id: number;
  name: string;
  category: string;
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
}

export interface IDialogUser {
  id?: number[];
  name: string;
  password: string;
  access: number;
  branchId: number;
}

export interface IDialogIngredient {
  id?: number[];
  name: string;
  category: string;
  cost: number;
  text: string;
  text_combo: string;
  allergens: number[];
}
