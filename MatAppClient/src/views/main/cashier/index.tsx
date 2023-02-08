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
      <button
        onClick={() => {
          setSession({
            id: 1,
            branchId: branchID,
            currentOrders: [],
            startTime: new Date(),
          } as ISession);
        }}
      >
        test
      </button>
      <code>{JSON.stringify(session)}</code>
    </div>
  );
};

export default Cashier;
