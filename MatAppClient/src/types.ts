import type { Socket } from 'socket.io-client';
import type { IBaseModel, IBranch, IIngredient, INamedBaseModel, ISession, IUser } from '../../src/types';
import type { Dispatch, SetStateAction } from 'react';

export * from '../../src/types';

export interface AppContextType {
  loading: boolean;
  socket: Socket;
  language: LanguageType;
  setLanguage: Dispatch<SetStateAction<LanguageType>>;
  theme: ThemeType;
  setTheme: Dispatch<SetStateAction<ThemeType>>;
  translate: (text: string) => string;
  branches: IBranch[];
  setLoading: Dispatch<SetStateAction<boolean>>;
  getBranches: VoidFunction;
  clearBranches: VoidFunction;
  user: IUser;
  setUser: Dispatch<SetStateAction<IUser>>;
}

export type LanguageType = 'english' | 'czech';

export type ThemeType = 'light' | 'dark' | 'white';

export type IDialogOption = 'hidden' | 'add' | 'edit' | 'edit_multiple' | 'other' | 'delete';

export interface AdminContextType {
  selectedItems: INamedBaseModel[];
  selectedIDs: number[];
  setSelectedIDs: Dispatch<SetStateAction<number[]>>;
  refresh: () => void;
  dialog: IDialogOption;
  setDialog: Dispatch<SetStateAction<IDialogOption>>;
  branches: IBranch[];
  getBranches: VoidFunction;
  ingredients: IIngredient[];
  getIngredients: VoidFunction;
}

export interface MainContextType {
  branchID: number;
  setBranchID: Dispatch<SetStateAction<number>>;
  session: ISession;
  getSession: VoidFunction;
  setSession: (data: ISession) => void;
}

export interface Information {
  uptime: string;
  memory: string;
  clients: number;
  time: string;
  data: string[];
  database: string[];
  timeLog: { [key: string]: number };
}
export interface FilterData<T extends IBaseModel> {
  filterMatch: (x: T, index?: number) => boolean;
  sort: (x: T, y: T) => number;
}

export interface Sort {
  name: string;
  type: string;
}
