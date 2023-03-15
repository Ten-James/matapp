import React, { useState } from 'react';
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
import Orders from './orders';

const Main = () => {
  const { socket, user } = useAppContext();
  if (user === null) throw new Error('User is null');
  const [branchID, setBranchID] = useState(user.branchId || 0);
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
            path="orders"
            element={<p>wait</p>}
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
            path="orders"
            element={<Orders />}
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
