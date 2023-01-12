import type { Socket } from 'socket.io-client';
import type { IBaseModel, IBranch, INamedBaseModel, IUser } from '../../src/types';
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
  setBranches: Dispatch<SetStateAction<IBranch[]>>;
  user: IUser;
  setUser: Dispatch<SetStateAction<IUser>>;
}

export type LanguageType = 'english' | 'czech';

export type ThemeType = 'light' | 'dark' | 'white';

export type IDialogOption = 'hidden' | 'add' | 'edit' | 'edit_multiple' | 'delete';

export interface AdminContextType {
  selectedItems: INamedBaseModel[];
  selectedIDs: number[];
  setSelectedIDs: Dispatch<SetStateAction<number[]>>;
  refresh: () => void;
  dialog: IDialogOption;
  setDialog: Dispatch<SetStateAction<IDialogOption>>;
  branches: IBranch[];
  setBranches: Dispatch<SetStateAction<IBranch[]>>;
}

export interface Information {
  uptime: string;
  memory: string;
  clients: number;
  time: string;
  data: string[];
  database: string[];
}
export interface FilterData<T extends IBaseModel> {
  filterMatch: (x: T, index?: number) => boolean;
  sort: (x: T, y: T) => number;
}

export interface Sort {
  name: string;
  type: string;
}
