/* DATABASE MODELS */
export interface IBaseModel {
  id: number;
}

export interface IBranch extends IBaseModel {
  name: string;
  location: string;
}

export interface IBranchData<T extends IBaseModel> extends IBranch {
  data: T[];
}

export interface IIngredient extends IBaseModel {
  name: string;
  cost: number;
  category: string;
  allergens: string;
  count?: number;
}

export interface IDish extends IBaseModel {
  name: string;
  cost: number;
  category: string;
  ingredients: string[];
}

export interface IUser extends IBaseModel {
  name: string;
  password?: string;
  access: number;
  branchId: number;
  branchName?: string;
}

export interface IOrder extends IBaseModel {
  date: string;
  dishes: string;
  cost: number;
  type: string;
}
