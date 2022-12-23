import { Socket } from 'socket.io-client';
import type { IBaseModel, IBranch } from '../../src/types';

export * from '../../src/types';

export interface AppContext {
  loading: boolean;
  socket: Socket;
  language: LanguageType;
  setLanguage: (language: LanguageType) => void;
  branches: IBranch[];
  setLoading: (loading: boolean) => void;
  setBranches: (branches: IBranch[]) => void;
}

export type LanguageType = 'english' | 'czech';

export type DialogType = 'hidden' | 'add' | 'edit' | 'edit_multiple' | 'delete';

export interface AdminContextType {
  selectedIDs: number[];
  setSelectedIDs: (selectedIDs: number[]) => void;
  refresh: () => void;
  dialog: DialogType;
  setDialog: (dialog: DialogType) => void;
  branches: IBranch[];
  setBranches: (branches: IBranch[]) => void;
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
