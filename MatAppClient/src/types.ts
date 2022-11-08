import { Socket } from 'socket.io-client';
export interface Branch extends BaseProp {
  id: number;
  name: string;
  location: string;
}
export interface AppContext {
  loading: boolean;
  socket: Socket;
  language: LanguageType;
  setLanguage: (language: LanguageType) => void;
  branches: Branch[];
  setLoading: (loading: boolean) => void;
  setBranches: (branches: Branch[]) => void;
}
export type LanguageType = 'english' | 'czech';

export type DialogType = 'hidden' | 'add' | 'edit' | 'edit_multiple' | 'delete';

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
  database: string[];
}
export interface FilterData<T extends BaseProp> {
  filterMatch: (x: T, index?: number) => boolean;
  sort: (x: T, y: T) => number;
}

export interface BaseProp {
  id: number;
}

export interface Ingredient extends BaseProp {
  name: string;
  text: string;
  category: string;
  allergens: string;
}

export interface Dishes extends BaseProp {
  name: string;
  cost: string;
  ingredients: string[];
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

export interface BranchIngredients extends BaseProp {
  name: string;
  category: string;
  count: number;
}
export interface BranchOrders extends BaseProp {
  date: string;
  dishes: string;
  cost: number;
  type: string;
}

export interface BaseBranchProps<T extends BaseProp> extends Branch {
  sessionTime?: number;
  data: T[];
}
