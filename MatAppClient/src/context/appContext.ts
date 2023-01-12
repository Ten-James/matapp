import { createContext, useContext } from 'react';
import { AppContextType } from '../types';

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const data = useContext(AppContext);
  if (!data) throw new Error('AppContext is not defined');
  return data;
};
