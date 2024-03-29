import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { Panel } from '../common/panel';
import { useAppContext } from '../../context/appContext';

const ROUTES = [
  { path: '/main/cashier', name: 'cashier', icon: 'home' },
  { path: '/main/orders', name: 'order', icon: 'monitor' },
  { path: '/main/kitchen', name: 'kitchen', icon: 'kitchen' },
  { path: '/admin', name: 'management', icon: 'admin_panel_settings' },
] as const;

interface Props {
  showSettings: () => void;
}
export const SelectorContainer = ({ showSettings }: Props) => {
  const { translate } = useAppContext();

  return (
    <div className="selector-container">
      {ROUTES.map(({ path, name, icon }) => (
        <Link
          to={path}
          key={path}
        >
          <Panel class="selector">
            <span className="material-symbols-outlined">{icon}</span>
            {translate(name)}
          </Panel>
        </Link>
      ))}

      <Panel
        class="selector"
        onClick={showSettings}
      >
        <span className="material-symbols-outlined">settings</span>
        {translate('settings')}
      </Panel>
    </div>
  );
};
