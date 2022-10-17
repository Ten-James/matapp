import { Link } from "react-router-dom";
interface BetterLinkProps {
  to: string;
  expanded: boolean;
  expandedText: string;
  enabled: boolean;
  icon: JSX.Element | string;
}

interface SubBetterLinkProps {
  location: string;
  to: string;
  expanded: boolean;
  expandedText: string;
  enabled: boolean;
  icon: JSX.Element | string;
  children: JSX.Element | JSX.Element[];
}

export const BetterLink = ({ to, expandedText, expanded, enabled, icon }: BetterLinkProps) => {
  return !enabled ? (
    <div className="nav-link disabled">
      {icon}
      {expanded ? expandedText : ""}
    </div>
  ) : (
    <Link className="nav-link" to={to}>
      {icon}
      {expanded ? expandedText : ""}
    </Link>
  );
};

export const SubBetterLink = ({ to, expandedText, expanded, enabled, icon, children, location }: SubBetterLinkProps) => {
  return location.includes(to) ? (
    <div className="nav-link-selected">
      {!enabled ? (
        <div className="nav-link disabled">
          {icon}
          {expanded ? expandedText : ""}
        </div>
      ) : (
        <Link className="nav-header" to={to}>
          {icon}
          {expanded ? expandedText : ""}
        </Link>
      )}
      {children}
    </div>
  ) : !enabled ? (
    <div className="nav-link disabled">
      {icon}
      {expanded ? expandedText : ""}
    </div>
  ) : (
    <Link className="nav-link" to={to}>
      {icon}
      {expanded ? expandedText : ""}
    </Link>
  );
};
