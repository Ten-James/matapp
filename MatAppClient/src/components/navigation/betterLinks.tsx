import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { navigationContext } from '../../views/admin/navigation/index';
interface BetterLinkProps {
  to: string;
  expandedText: string;
  icon: string;
  onClick?: () => void;
}

interface SubBetterLinkProps {
  to: string;
  expandedText: string;
  icon: string;
  children: JSX.Element | JSX.Element[];
  count: number;
}

const ExpandedText = ({ isExpanded, text }: { isExpanded: boolean; text: string }) => {
  return (
    <div
      className="text"
      style={{ paddingLeft: isExpanded ? '5.2em' : '0' }}
    >
      <p style={{ transform: 'translateX(-5.2em)' }}> {text}</p>
    </div>
  );
};

const ExpandedChild = ({ isExpanded, children, count }: { isExpanded: boolean; children: JSX.Element | JSX.Element[]; count: number }) => {
  const style = {
    paddingBottom: isExpanded ? `${5 * count + 0.5}em` : '0',
  };
  return (
    <div
      className="child"
      style={style}
    >
      <div style={{ transform: isExpanded ? 'translateY(0)' : 'translateY(-5em)' }}> {children}</div>
    </div>
  );
};

export const BetterLink = ({ to, expandedText, icon, onClick }: BetterLinkProps) => {
  const { isExpanded } = useContext(navigationContext);
  return (
    <Link
      className="nav-link single"
      to={to}
      onClick={onClick}
    >
      <span className="material-symbols-outlined">{icon}</span>
      <ExpandedText
        isExpanded={isExpanded}
        text={expandedText}
      />
    </Link>
  );
};

export const SubBetterLink = ({ to, expandedText, icon, children, count }: SubBetterLinkProps) => {
  const { isExpanded, location } = useContext(navigationContext);
  return (
    <Link
      className={'nav-link' + (location.includes(to) ? ' nav-link-selected' : '')}
      to={to}
    >
      <div className="nav-header ">
        <span className="material-symbols-outlined">{icon}</span>
        <ExpandedText
          isExpanded={isExpanded}
          text={expandedText}
        />
      </div>
      <ExpandedChild
        count={count}
        isExpanded={location.includes(to)}
      >
        {children}
      </ExpandedChild>
    </Link>
  );
};
