import React, { createContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BetterLink, SubBetterLink } from '../../../components/navigation/betterLinks';
import LogoSVG from '../../../components/common/logo';
import './navigation.css';
import { useAppContext } from '../../../context/appContext';
import { useAdminContext } from '../../../context/adminContext';

interface NavigationProps {
  userAccess: number;
}

interface NavigationContext {
  location: string;
  isExpanded: boolean;
}

export const navigationContext = createContext<NavigationContext>({
  location: '',
  isExpanded: false,
});

const Navigation = ({ userAccess }: NavigationProps) => {
  const { refresh } = useAdminContext();
  const { translate } = useAppContext();
  const navigate = useNavigate();
  const [Expanded, setExpanded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => setExpanded(true), 3000);
  }, []);

  return (
    <navigationContext.Provider value={{ location: location.pathname, isExpanded: Expanded }}>
      <div>
        <div className="nav">
          <div className="nav-container">
            <div
              className="logo"
              onClick={() => navigate('/')}
            >
              <LogoSVG class="small" />
            </div>
            <div
              style={{
                transform: Expanded ? 'translateX(1em)' : 'translateX(-0.2em)',
              }}
            >
              {userAccess === 0 ? (
                <></>
              ) : userAccess === 1 ? (
                <>
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
                    to={location.pathname}
                    expandedText={translate('Refresh')}
                    icon="sync"
                    onClick={refresh}
                  />
                </>
              ) : (
                <>
                  <SubBetterLink
                    to="branches"
                    expandedText={translate('Branches')}
                    icon="store"
                    count={2}
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
                    to={location.pathname}
                    expandedText={translate('Refresh')}
                    icon="sync"
                    onClick={refresh}
                  />
                </>
              )}
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
