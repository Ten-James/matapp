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

export interface IBranchData<T extends IBaseModel> extends IBranch {
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
  ingredients: IIngredient[];
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
  displayId: number;
  date: string;
  dishes: { id: number; count: number }[];
  cost: number;
  type: string;
}

export interface IBaseSession extends IBaseModel {
  branchId: number;
  startTime: string;
  endTime?: string;
}
export interface ISession extends IBaseSession {
  currentOrders: IOrder[];
}

export interface IReportData {
  sessions: IBaseSession[];
  orders: IOrder[];
}
