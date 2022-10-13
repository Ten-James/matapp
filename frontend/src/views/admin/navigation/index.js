import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";

import "../../../styles/admin/navigation.css";
import LogoSVG from "../../../components/logo";
const Navigation = ({ user }) => {
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
          Expanded={Expanded}
          expandedtext="Home"
          enabled={user >= 1}
          icon={<span className="material-symbols-outlined">home</span>}
        />
        <SubBetterLink
          location={location.pathname}
          to="branches"
          Expanded={Expanded}
          expandedtext="Branches"
          enabled={user >= 1}
          icon={<span className="material-symbols-outlined">store</span>}
        >
          <BetterLink
            to="branches/reports"
            Expanded={Expanded}
            expandedtext="Reports"
            enabled={user >= 1}
            icon={<span className="material-symbols-outlined">receipt_long</span>}
          />
          <BetterLink
            to="branches/storage"
            Expanded={Expanded}
            expandedtext="Storage"
            enabled={user >= 1}
            icon={<span className="material-symbols-outlined">kitchen</span>}
          />
        </SubBetterLink>
        <BetterLink
          to="ingredients"
          Expanded={Expanded}
          expandedtext="Ingredients"
          enabled={user >= 1}
          icon={<span className="material-symbols-outlined">eco</span>}
        />
        <BetterLink
          to="dishes"
          Expanded={Expanded}
          expandedtext="Dishes"
          enabled={user >= 1}
          icon={<span className="material-symbols-outlined">restaurant</span>}
        />
        <BetterLink
          to="Information"
          Expanded={Expanded}
          expandedtext="Information"
          enabled={user === 2}
          icon={<span className="material-symbols-outlined">info</span>}
        />
      </div>
      <div className="logo">
        <LogoSVG type="small" />
      </div>
    </div>
  );
};

export default Navigation;

const BetterLink = ({ to, expandedtext, Expanded, enabled, icon }) => {
  return !enabled ? (
    <div className="nav-link disabled">
      {icon}
      {Expanded ? expandedtext : ""}
    </div>
  ) : (
    <Link className="nav-link" to={to}>
      {icon}
      {Expanded ? expandedtext : ""}
    </Link>
  );
};

const SubBetterLink = ({ to, expandedtext, Expanded, enabled, icon, children, location }) => {
  return location.includes(to) ? (
    <div className="nav-link-selected">
      {!enabled ? (
        <div className="nav-link disabled">
          {icon}
          {Expanded ? expandedtext : ""}
        </div>
      ) : (
        <Link className="nav-header" to={to}>
          {icon}
          {Expanded ? expandedtext : ""}
        </Link>
      )}
      {children}
    </div>
  ) : !enabled ? (
    <div className="nav-link disabled">
      {icon}
      {Expanded ? expandedtext : ""}
    </div>
  ) : (
    <Link className="nav-link" to={to}>
      {icon}
      {Expanded ? expandedtext : ""}
    </Link>
  );
};
