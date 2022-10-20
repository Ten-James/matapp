import { useLocation } from "react-router-dom";
import { useState, createContext } from "react";
import { BetterLink, SubBetterLink } from "./betterLinks";

import "../../../styles/admin/navigation.css";
import LogoSVG from "../../../components/logo";

interface NavigationProps {
  userAccess: number;
}

interface NavigationContext {
  location: string;
  isExpanded: boolean;
  userAccess: number;
}

export const navigationContext = createContext<NavigationContext>({
  location: "",
  isExpanded: false,
  userAccess: 0,
});

const Navigation = ({ userAccess }: NavigationProps) => {
  const [Expanded, setExpanded] = useState(false);
  const location = useLocation();

  return (
    <navigationContext.Provider value={{ location: location.pathname, isExpanded: Expanded, userAccess }}>
      <div className='nav'>
        <button onClick={() => setExpanded(!Expanded)}>
          {Expanded ? <span className='material-symbols-outlined'>west</span> : <span className='material-symbols-outlined'>east</span>}
        </button>
        <div>
          <BetterLink to='' expandedText='Home' icon='home' />
          <SubBetterLink to='branches' expandedText='Branches' icon='store'>
            <BetterLink to='branches/reports' expandedText='Reports' icon='receipt_long' />
            <BetterLink to='branches/storage' expandedText='Storage' icon='kitchen' />
          </SubBetterLink>
          <BetterLink to='ingredients' expandedText='Ingredients' icon='eco' />
          <BetterLink to='dishes' expandedText='Dishes' icon='restaurant' />
          <BetterLink to='information' requiredAdmin expandedText='Information' icon='info' />
          <BetterLink to={location.pathname} expandedText='Information' icon='sync' />
        </div>
        <div className='logo'>
          <LogoSVG class='small' />
        </div>
      </div>
    </navigationContext.Provider>
  );
};

export default Navigation;
