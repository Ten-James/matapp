import React, { createContext, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import socketIOClient from 'socket.io-client';

import { Button } from './components/common/panel';
import { Translate } from './misc/transcripter';
import { AppContext, IBranch, LanguageType, ThemeType } from './types';
import Admin from './views/admin/admin';
import BranchSelector from './views/branchSelector';
import ErrorPage from './views/errorPage';
import Loader from './views/loading';
import BaseView from './views';
import SettingsDialog from './components/dialog/settingsDialog';
import useLocalStorage from './hooks/useLocalStorage';
// TODO: move to env file
const socket = socketIOClient('http://localhost:2238');

export const context: React.Context<AppContext> = createContext<AppContext>({
  loading: true,
  socket: socket,
  language: 'english',
  setLanguage: () => {},
  theme: 'light',
  setTheme: () => {},
  branches: [],
  translate: (text) => text,
  setLoading: () => {},
  setBranches: () => {},
});

// TODO: use styled components?

const App = () => {
  const [loading, setLoading] = useState(true);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [language, setLanguage] = useLocalStorage<LanguageType>('mat_lang', 'english');
  const [theme, setTheme] = useLocalStorage<ThemeType>('mat_theme', 'light');
  const location = useLocation();
  //TODO- move to branchSelector
  const [branches, setBranches] = useState<IBranch[]>([]);

  const contextValue: AppContext = {
    loading,
    socket,
    branches,
    language,
    translate: language === 'czech' ? (text) => Translate(text, 'czech') : (text) => Translate(text, 'english'),
    setLanguage,
    theme,
    setTheme,
    setLoading,
    setBranches,
  };

  return (
    <context.Provider value={contextValue}>
      <Loader>
        <div className={`${theme}-color`}>
          <>
            {settingsVisible ? <SettingsDialog hide={() => setSettingsVisible(false)} /> : null}
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
                path="/"
                element={<BaseView showSettings={() => setSettingsVisible(true)} />}
              />
              <Route
                path="*"
                element={<ErrorPage />}
              />
            </Routes>
            {location.pathname !== '/' ? (
              <Button
                class="lang-button"
                color="gray"
                onClick={() => setSettingsVisible((x) => !x)}
              >
                <span className="material-symbols-outlined">settings</span>
              </Button>
            ) : null}
          </>
        </div>
      </Loader>
    </context.Provider>
  );
};
export default App;
