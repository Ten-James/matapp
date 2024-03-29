import React, { useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router';
import socketIOClient from 'socket.io-client';

import { Button, Panel } from './components/common/panel';
import { Translate } from './misc/transcripter';
import { AppContextType, IBranch, IUser, LanguageType, ThemeType } from './types';
import ErrorPage from './views/errorPage';
import Loader from './views/loading';
import BaseView from './views';
import SettingsDialog from './components/dialog/settingsDialog';
import useLocalStorage from './hooks/useLocalStorage';
import { AppContext } from './context/appContext';
import LoginPage from './views/login';
import useStatus from './hooks/useStatus';

import useSocket from './hooks/useSocket';
import Main from './views/main';
import Admin from './views/admin';
const socket = socketIOClient(import.meta.env.VITE_SERVER_API || 'http://localhost:2238');


const App = () => {
  const [loading, setLoading] = useState(true);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const { status, statusStyle, setStatusHandler, onClick, extraData } = useStatus();
  const navigate = useNavigate();

  const [language, setLanguage] = useLocalStorage<LanguageType>('mat_lang', 'english');
  const [theme, setTheme] = useLocalStorage<ThemeType>('mat_theme', 'light');
  const [buttonVisible, setButtonVisible] = useState(true);
  const location = useLocation();
  const [branches, getBranches, clearBranches] = useSocket<IBranch[]>(socket, 'branches', []);

  socket.on('status', setStatusHandler);

  const [user, setUser] = useState<IUser | null>(null);

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
    getBranches,
    user,
    setUser,
    clearBranches,
    setShowButtons: setButtonVisible,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <Loader>
        <div className={`full-size ${theme}-color`}>
          <LoginPage>
            {settingsVisible ? <SettingsDialog hide={() => setSettingsVisible(false)} /> : null}
            <Routes>
              <Route
                path="/main/*"
                element={<Main />}
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
            {buttonVisible ? (
              <>
                {location.pathname !== '/' ? (
                  <>
                    <Button
                      class="lang-button"
                      color="gray"
                      style={{ right: '10em' }}
                      onClick={() => navigate('')}
                    >
                      <span className="material-symbols-outlined">home</span>
                    </Button>
                    <Button
                      class="lang-button"
                      color="gray"
                      style={{ right: '5em' }}
                      onClick={() => setSettingsVisible((x) => !x)}
                    >
                      <span className="material-symbols-outlined">settings</span>
                    </Button>
                  </>
                ) : null}
                <Button
                  class="lang-button"
                  color="gray"
                  onClick={() => setUser(null)}
                >
                  <span className="material-symbols-outlined">logout</span>
                </Button>
              </>
            ) : null}
          </LoginPage>
          <Panel
            class="status"
            style={statusStyle}
            onClick={onClick}
          >
            {Translate(status, language)}
            {extraData ? `: ${extraData}` : null}
          </Panel>
        </div>
      </Loader>
    </AppContext.Provider>
  );
};
export default App;
