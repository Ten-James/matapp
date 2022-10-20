import { useContext } from "react";
import { Link } from "react-router-dom";
import { navigationContext } from "./index";
interface BetterLinkProps {
  to: string;
  requiredAdmin?: boolean;
  expandedText: string;
  icon: string;
}

interface SubBetterLinkProps {
  to: string;
  expandedText: string;
  requiredAdmin?: boolean;
  icon: string;
  children: JSX.Element | JSX.Element[];
}

export const BetterLink = ({ to, expandedText, icon, requiredAdmin }: BetterLinkProps) => {
  requiredAdmin = requiredAdmin || false;
  const { isExpanded, userAccess } = useContext(navigationContext);
  return !(userAccess >= (requiredAdmin ? 2 : 1)) ? (
    <div className='nav-link disabled'>
      <span className='material-symbols-outlined'>{icon}</span>
      {isExpanded ? expandedText : ""}
    </div>
  ) : (
    <Link className='nav-link' to={to}>
      <span className='material-symbols-outlined'>{icon}</span>
      {isExpanded ? expandedText : ""}
    </Link>
  );
};

export const SubBetterLink = ({ to, expandedText, icon, children, requiredAdmin }: SubBetterLinkProps) => {
  requiredAdmin = requiredAdmin || false;
  const { isExpanded, userAccess, location } = useContext(navigationContext);
  return location.includes(to) ? (
    <div className='nav-link-selected'>
      {!(userAccess >= (requiredAdmin ? 2 : 1)) ? (
        <div className='nav-link disabled'>
          <span className='material-symbols-outlined'>{icon}</span>
          {isExpanded ? expandedText : ""}
        </div>
      ) : (
        <Link className='nav-header' to={to}>
          <span className='material-symbols-outlined'>{icon}</span>
          {isExpanded ? expandedText : ""}
        </Link>
      )}
      {children}
    </div>
  ) : !(userAccess >= (requiredAdmin ? 2 : 1)) ? (
    <div className='nav-link disabled'>
      <span className='material-symbols-outlined'>{icon}</span>
      {isExpanded ? expandedText : ""}
    </div>
  ) : (
    <Link className='nav-link' to={to}>
      <span className='material-symbols-outlined'>{icon}</span>
      {isExpanded ? expandedText : ""}
    </Link>
  );
};
