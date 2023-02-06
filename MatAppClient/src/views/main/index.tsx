import { useState } from 'react';
import BranchSelector from './branchSelector';
import { MainContext } from '../../context/mainContext';
import { Route, Routes } from 'react-router';
import ErrorPage from '../errorPage';
import Cashier from './cashier';
import Kitchen from './kitchen';

const Main = () => {
  const [branchID, setBranchID] = useState(0);

  return (
    <MainContext.Provider value={{ branchID, setBranchID }}>
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
