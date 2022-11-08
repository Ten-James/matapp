import React, { createContext, useState } from 'react';
import { Route, Routes } from 'react-router';
import socketIOClient from 'socket.io-client';

import { Button } from './components/panel';
import { AppContext, Branch, LanguageType } from './types';
import Admin from './views/admin/admin';
import BranchSelector from './views/branchSelector';
import ErrorPage from './views/errorPage';
import Loader from './views/loading';
// TODO: move to env file
const socket = socketIOClient('http://localhost:2238');

export const context: React.Context<AppContext> = createContext<AppContext>({
  loading: true,
  socket: socket,
  language: 'english',
  setLanguage: () => {},
  branches: [],
  setLoading: () => {},
  setBranches: () => {},
});

// TODO: use styled components?

// TODO: dont send language, send function to translate

const App = () => {
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<LanguageType>('english');
  //TODO- move to branchSelector
  const [branches, setBranches] = useState<Branch[]>([]);

  const contextValue: AppContext = {
    loading,
    socket,
    branches,
    language,
    setLanguage,
    setLoading: setLoading,
    setBranches: setBranches,
  };

  return (
    <context.Provider value={contextValue}>
      <Loader>
        <Routes>
          <Route
            path="/branches"
            element={<BranchSelector branches={branches} />}
          />
          <Route
            path="/admin/*"
            element={<Admin />}
          />
          <Route
            path="*"
            element={<ErrorPage />}
          />
        </Routes>
        {language === 'english' ? (
          <Button
            class="lang-button"
            onClick={() => setLanguage('czech')}
          >
            EN
          </Button>
        ) : (
          <Button
            class="lang-button"
            onClick={() => setLanguage('english')}
          >
            CZ
          </Button>
        )}
      </Loader>
    </context.Provider>
  );
};
export default App;
