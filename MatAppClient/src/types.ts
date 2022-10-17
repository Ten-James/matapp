import { Socket } from "socket.io-client";
export interface Branch {
  id: number;
  name: string;
  location: string;
}
export interface AppContext {
  loading: boolean;
  socket: Socket;
  branches: Branch[];
  setLoading: (loading: boolean) => void;
  setBranches: (branches: Branch[]) => void;
}
export interface AdminContext {
  SelectedRow: number[];
  setSelectedRow: (selectedRow: number[]) => void;
}

export interface Information {
  uptime: string;
  memory: string;
  clients: number;
  time: string;
  data: string[];
}
export interface FilterData<T extends BaseProp> {
  filterMatch: (x: T, index?: number) => boolean;
  sort: (x: T, y: T) => number;
}

export interface BaseProp {
  id: number;
}

export interface Ingredient extends BaseProp {
  id: number;
  name: string;
  Category: string;
}

export interface User extends BaseProp {
  id: number;
  name: string;
  access: number;
  branch_id: number;
}
