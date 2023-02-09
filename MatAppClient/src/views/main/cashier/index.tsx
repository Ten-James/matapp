import { useEffect } from 'react';
import { useMainContext } from '../../../context/mainContext';
import { ISession } from '../../../types';

const Cashier = () => {
  const { branchID, session, setSession, getSession } = useMainContext();

  useEffect(() => {
    if (session === null) getSession();
  });

  return (
    <div>
      <h1>Cashier</h1>
      <h2>Branch ID: {branchID}</h2>
      <code>{JSON.stringify(session)}</code>
    </div>
  );
};

export default Cashier;
