import { useLocation } from "react-router-dom";
import { useState } from "react";
import { BetterLink, SubBetterLink } from "./betterLinks";

import "../../../styles/admin/navigation.css";
import LogoSVG from "../../../components/logo";

interface NavigationProps {
  user: number;
}

const Navigation = ({ user }: NavigationProps) => {
  const [Expanded, setExpanded] = useState(false);
  const location = useLocation();

  return (
    <div className="nav">
      <button onClick={() => setExpanded(!Expanded)}>
        {Expanded ? <span className="material-symbols-outlined">west</span> : <span className="material-symbols-outlined">east</span>}
      </button>
      <div>
        <BetterLink
          to=""
          expanded={Expanded}
          expandedText="Home"
          enabled={user >= 1}
          icon={<span className="material-symbols-outlined">home</span>}
        />
        <SubBetterLink
          location={location.pathname}
          to="branches"
          expanded={Expanded}
          expandedText="Branches"
          enabled={user >= 1}
          icon={<span className="material-symbols-outlined">store</span>}
        >
          <BetterLink
            to="branches/reports"
            expanded={Expanded}
            expandedText="Reports"
            enabled={user >= 1}
            icon={<span className="material-symbols-outlined">receipt_long</span>}
          />
          <BetterLink
            to="branches/storage"
            expanded={Expanded}
            expandedText="Storage"
            enabled={user >= 1}
            icon={<span className="material-symbols-outlined">kitchen</span>}
          />
        </SubBetterLink>
        <BetterLink
          to="ingredients"
          expanded={Expanded}
          expandedText="Ingredients"
          enabled={user >= 1}
          icon={<span className="material-symbols-outlined">eco</span>}
        />
        <BetterLink
          to="dishes"
          expanded={Expanded}
          expandedText="Dishes"
          enabled={user >= 1}
          icon={<span className="material-symbols-outlined">restaurant</span>}
        />
        <BetterLink
          to="Information"
          expanded={Expanded}
          expandedText="Information"
          enabled={user === 2}
          icon={<span className="material-symbols-outlined">info</span>}
        />
      </div>
      <div className="logo">
        <LogoSVG class="small" />
      </div>
    </div>
  );
};

export default Navigation;
