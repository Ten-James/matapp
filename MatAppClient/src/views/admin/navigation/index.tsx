import { createContext, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BetterLink, SubBetterLink } from './betterLinks';

import { context } from '../../../App';
import LogoSVG from '../../../components/logo';
import { AdminContext } from '../admin';
import './navigation.css';

interface NavigationProps {
  userAccess: number;
}

interface NavigationContext {
  location: string;
  isExpanded: boolean;
  userAccess: number;
}

export const navigationContext = createContext<NavigationContext>({
  location: '',
  isExpanded: false,
  userAccess: 0,
});

const Navigation = ({ userAccess }: NavigationProps) => {
  const { refresh } = useContext(AdminContext);
  const { translate } = useContext(context);
  const [Expanded, setExpanded] = useState(false);
  const location = useLocation();

  return (
    <navigationContext.Provider value={{ location: location.pathname, isExpanded: Expanded, userAccess }}>
      <div>
        <div className="nav">
          <div className="nav-container">
            <div
              className="logo"
              onClick={() => setExpanded(!Expanded)}
            >
              <LogoSVG class="small" />
            </div>
            <div
              style={{
                transform: Expanded ? 'translateX(1em)' : 'translateX(-0.2em)',
              }}
            >
              <SubBetterLink
                to="branches"
                expandedText={translate('Branches')}
                icon="store"
                count={3}
              >
                <BetterLink
                  to="branches/reports"
                  expandedText={translate('Reports')}
                  icon="receipt_long"
                  onClick={() => setExpanded(false)}
                />
                <BetterLink
                  to="branches/storage"
                  expandedText={translate('Storage')}
                  icon="warehouse"
                  onClick={() => setExpanded(false)}
                />
                <BetterLink
                  to="branches/orders"
                  expandedText={translate('Orders')}
                  icon="list_alt"
                  onClick={() => setExpanded(false)}
                />
              </SubBetterLink>
              <SubBetterLink
                to="table"
                expandedText={translate('Tables')}
                icon="storage"
                count={3}
              >
                <BetterLink
                  to="table/users"
                  expandedText={translate('Users')}
                  icon="group"
                  onClick={() => setExpanded(false)}
                />
                <BetterLink
                  to="table/ingredients"
                  expandedText={translate('Ingredients')}
                  icon="kitchen"
                  onClick={() => setExpanded(false)}
                />
                <BetterLink
                  to="table/dishes"
                  expandedText={translate('Dishes')}
                  icon="restaurant"
                  onClick={() => setExpanded(false)}
                />
              </SubBetterLink>
              <BetterLink
                to="information"
                requiredAdmin
                expandedText={translate('Information')}
                icon="info"
                onClick={() => setExpanded(false)}
              />
              <BetterLink
                to={location.pathname}
                expandedText={translate('Refresh')}
                icon="sync"
                onClick={refresh}
              />
            </div>
            <button
              className={Expanded ? 'child-rot' : ''}
              onClick={() => setExpanded(!Expanded)}
            >
              <span className="material-symbols-outlined">east</span>
            </button>
          </div>
        </div>
      </div>
    </navigationContext.Provider>
  );
};

export default Navigation;
