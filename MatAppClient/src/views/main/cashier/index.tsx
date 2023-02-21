import { useEffect } from 'react';
import { useMainContext } from '../../../context/mainContext';
import { IDishCategory, ISession } from '../../../types';
import { useAppContext } from '../../../context/appContext';
import useSocket from '../../../hooks/useSocket';

const Cashier = () => {
  const { socket } = useAppContext();
  const { branchID, session, setSession, getSession } = useMainContext();
  const [categories, getCategories] = useSocket<IDishCategory[]>(socket, 'dish_categories', []);

  useEffect(() => {
    if (session === null) getSession();
    getCategories();
  }, []);

  return (
    <div>
      <h1>Cashier</h1>
      <h2>Branch ID: {branchID}</h2>
      {categories?.map((category) => (
        <>
          <h3>{category.name}</h3>
          <span className="material-symbols-outlined">{category.icon}</span>
        </>
      ))}
    </div>
  );
};

export default Cashier;
