import { useState } from 'react';
import BranchSelector from './branchSelector';
import { MainContext } from '../../context/mainContext';
import { Route, Routes } from 'react-router';
import ErrorPage from '../errorPage';
import Cashier from './cashier';
import Kitchen from './kitchen';
import useSession from '../../hooks/useSession';
import { useAppContext } from '../../context/appContext';

const Main = () => {
  const { socket } = useAppContext();
  const [branchID, setBranchID] = useState(0);
  const [session, getSession, setSession] = useSession(socket, branchID);

  return (
    <MainContext.Provider value={{ branchID, setBranchID, session, getSession, setSession }}>
      {branchID === 0 ? (
        <BranchSelector />
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
