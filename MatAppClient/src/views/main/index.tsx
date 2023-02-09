import { useState } from 'react';
import BranchSelector from './branchSelector';
import { MainContext } from '../../context/mainContext';
import { Route, Routes } from 'react-router';
import ErrorPage from '../errorPage';
import Cashier from './cashier';
import Kitchen from './kitchen';
import useSession from '../../hooks/useSession';
import { useAppContext } from '../../context/appContext';
import CashierNotStarted from './notstarted/cashier';
import KitchenNotStarted from './notstarted/kitchen';

const Main = () => {
  const { socket } = useAppContext();
  const [branchID, setBranchID] = useState(0);
  const [session, getSession, setSession] = useSession(socket, branchID);

  return (
    <MainContext.Provider value={{ branchID, setBranchID, session, getSession, setSession }}>
      {branchID === 0 ? (
        <BranchSelector />
      ) : session === null ? (
        <Routes>
          <Route
            path="cashier"
            element={<CashierNotStarted />}
          />
          <Route
            path="kitchen"
            element={<KitchenNotStarted />}
          />
          <Route
            path="*"
            element={<ErrorPage />}
          />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="cashier"
            element={<Cashier />}
          />
          <Route
            path="kitchen"
            element={<Kitchen />}
          />
          <Route
            path="*"
            element={<ErrorPage />}
          />
        </Routes>
      )}
    </MainContext.Provider>
  );
};

export default Main;
