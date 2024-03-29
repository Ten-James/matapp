import React, { useEffect, useRef, useState } from 'react';
import '../../views/admin/dialog/style.css';
import { Button } from '../common/panel';
import { ThemeType } from '../../types';
import { useAppContext } from '../../context/appContext';

interface Props {
  hide: VoidFunction;
}

const THEMES: ThemeType[] = ['light', 'white', 'dark'];

const SettingsDialog = ({ hide }: Props) => {
  const { translate, language, setLanguage, theme, setTheme } = useAppContext();
  const form = useRef<HTMLFormElement | null>(null);
  const [translateY, setTranslateY] = useState('-100vh');
  useEffect(() => {
    setTimeout(() => {
      setTranslateY('0');
    }, 100);
  }, []);
  return (
    <form
      ref={form}
      autoComplete="off"
      className="dialog-background"
    >
      <div
        className="dialog"
        style={{ transform: `translateY(${translateY})` }}
      >
        <h1 className="dialog-header">{translate('settings')}</h1>
        <h2>
          {translate('tws')}
          <br></br> {translate('ils')}
        </h2>
        <div className="dialog-content">
          <div className="dialog-line">
            <label htmlFor="">
              {translate('language')}: {language}
            </label>
            <Button
              onClick={(e) => {
                e.preventDefault();
                setLanguage((language) => (language === 'english' ? 'czech' : 'english'));
              }}
            >
              {translate('switch')}
            </Button>
          </div>
          <div className="dialog-line">
            <label htmlFor="">
              {translate('theme')}: {translate(theme)}
            </label>
            <Button
              onClick={(e) => {
                e.preventDefault();
                setTheme((theme) => [...THEMES, THEMES[0]][THEMES.indexOf(theme) + 1]);
              }}
            >
              {translate('switch')}
            </Button>
          </div>
        </div>
        <div className="dialog-buttons">
          <Button
            onClick={(e) => {
              e.preventDefault();
              setTranslateY('-100vh');
              setTimeout(hide, 500);
            }}
          >
            {translate('close')}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SettingsDialog;
