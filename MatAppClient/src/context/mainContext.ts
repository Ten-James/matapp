import { createContext, useContext } from 'react';
import { MainContextType } from '../types';

export const MainContext = createContext<MainContextType | undefined>(undefined);

export const useMainContext = () => {
  const data = useContext(MainContext);
  if (!data) throw new Error('MainContext is not defined');
  return data;
};
