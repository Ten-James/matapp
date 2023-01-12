import { createContext, useContext } from 'react';
import { AdminContextType } from '../types';

export const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdminContext = () => {
  const data = useContext(AdminContext);
  if (!data) throw new Error('AdminContext is not defined');
  return data;
};
