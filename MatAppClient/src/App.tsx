import React, { createContext, useEffect, useMemo, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import socketIOClient from 'socket.io-client';

import { Button, Panel } from './components/common/panel';
import { Translate } from './misc/transcripter';
import { AppContextType, IBranch, IUser, LanguageType, ThemeType } from './types';
import Admin from './views/admin/admin';
import BranchSelector from './views/branchSelector';
import ErrorPage from './views/errorPage';
import Loader from './views/loading';
import BaseView from './views';
import SettingsDialog from './components/dialog/settingsDialog';
import useLocalStorage from './hooks/useLocalStorage';
import { AppContext } from './context/appContext';
import LoginPage from './views/login';
import useStatus from './hooks/useStatus';
// TODO: move to env file
const socket = socketIOClient('http://localhost:2238');

// TODO: use styled components?

const App = () => {
  const [loading, setLoading] = useState(true);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const { status, statusStyle, setStatusHandler, onClick } = useStatus();

  const [language, setLanguage] = useLocalStorage<LanguageType>('mat_lang', 'english');
  const [theme, setTheme] = useLocalStorage<ThemeType>('mat_theme', 'light');
  const location = useLocation();
  //TODO- move to branchSelector
  const [branches, setBranches] = useState<IBranch[]>([]);

  socket.on('admin_status', setStatusHandler);

  const [user, setUser] = useState<IUser | null>(
    null,
    /*{
    id: 1,
    name: 'admin',
    access: 2,
    branchId: 0,
  }*/
  );

  const contextValue: AppContextType = {
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
    user,
    setUser,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <Loader>
        <div className={`${theme}-color`}>
          <LoginPage>
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
                style={{ right: '5em' }}
                onClick={() => setSettingsVisible((x) => !x)}
              >
                <span className="material-symbols-outlined">settings</span>
              </Button>
            ) : null}
            <Button
              class="lang-button"
              color="gray"
              onClick={() => setUser(null)}
            >
              <span className="material-symbols-outlined">logout</span>
            </Button>
          </LoginPage>
          <Panel
            class="status"
            style={statusStyle}
            onClick={onClick}
          >
            {Translate(status, language)}
          </Panel>
        </div>
      </Loader>
    </AppContext.Provider>
  );
};
export default App;
