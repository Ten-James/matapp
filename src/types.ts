/* DATABASE MODELS */
export interface IBaseModel {
  id: number;
}

export interface INamedBaseModel extends IBaseModel {
  name: string;
}

export interface ICategoryBaseModel extends INamedBaseModel {
  category: string;
}

export interface IBranch extends INamedBaseModel {
  location: string;
}

export interface IBranchData<T extends INamedBaseModel> extends IBranch {
  data: T[];
}

export interface IIngredient extends ICategoryBaseModel {
  cost: number;
  allergens: string;
  count?: number;
}

export interface IDish extends ICategoryBaseModel {
  cost: number;
  ingredients: string[];
}

export interface IUser extends INamedBaseModel {
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
