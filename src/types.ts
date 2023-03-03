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
  size: number;
}

export interface IBranchData<T extends INamedBaseModel> extends IBranch {
  data: T[];
}

export interface IIngredient extends ICategoryBaseModel {
  cost: number;
  allergens: string;
  text: string;
  recommendedCount: number;
  count?: number;
}

export interface IDish extends ICategoryBaseModel {
  cost: number;
  ingredients: string[];
}

export interface IDishCategory extends INamedBaseModel {
  icon: string;
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

export interface ISession {
  id: number;
  branchId: number;
  startTime: Date;
  currentOrders: any[];
}
