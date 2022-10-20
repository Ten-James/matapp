import { useContext } from "react";
import { Link } from "react-router-dom";
import { navigationContext } from "./index";
interface BetterLinkProps {
	to: string;
	requiredAdmin?: boolean;
	expandedText: string;
	icon: string;
	onClick?: () => void;
}

interface SubBetterLinkProps {
	to: string;
	expandedText: string;
	requiredAdmin?: boolean;
	icon: string;
	children: JSX.Element | JSX.Element[];
}

const ExpandedText = ({ isExpanded, text }: { isExpanded: boolean; text: string }) => {
	return (
		<div className='text' style={{ paddingLeft: isExpanded ? "5.5em" : "0" }}>
			<p style={{ transform: isExpanded ? "translateX(-5)" : "translateX(-5em)" }}> {text}</p>
		</div>
	);
};

export const BetterLink = ({ to, expandedText, icon, requiredAdmin, onClick }: BetterLinkProps) => {
	requiredAdmin = requiredAdmin || false;
	const { isExpanded, userAccess } = useContext(navigationContext);
	return !(userAccess >= (requiredAdmin ? 2 : 1)) ? (
		<div className='nav-link disabled'>
			<span className='material-symbols-outlined'>{icon}</span>
			<ExpandedText isExpanded={isExpanded} text={expandedText} />
		</div>
	) : (
		<Link className='nav-link' to={to} onClick={onClick}>
			<span className='material-symbols-outlined'>{icon}</span>
			<ExpandedText isExpanded={isExpanded} text={expandedText} />
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
					<ExpandedText isExpanded={isExpanded} text={expandedText} />
				</div>
			) : (
				<Link className='nav-header' to={to}>
					<span className='material-symbols-outlined'>{icon}</span>
					<ExpandedText isExpanded={isExpanded} text={expandedText} />
				</Link>
			)}
			{children}
		</div>
	) : !(userAccess >= (requiredAdmin ? 2 : 1)) ? (
		<div className='nav-link disabled'>
			<span className='material-symbols-outlined'>{icon}</span>
			<ExpandedText isExpanded={isExpanded} text={expandedText} />
		</div>
	) : (
		<Link className='nav-link' to={to}>
			<span className='material-symbols-outlined'>{icon}</span>
			<ExpandedText isExpanded={isExpanded} text={expandedText} />
		</Link>
	);
};
