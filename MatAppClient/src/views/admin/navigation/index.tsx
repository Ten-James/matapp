import { useLocation } from "react-router-dom";
import { useState, createContext, useContext } from "react";
import { BetterLink, SubBetterLink } from "./betterLinks";

import "../../../styles/admin/navigation.css";
import LogoSVG from "../../../components/logo";
import { AdminContext } from "../admin";

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
	const { refresh } = useContext(AdminContext);
	const [Expanded, setExpanded] = useState(false);
	const location = useLocation();

	return (
		<navigationContext.Provider value={{ location: location.pathname, isExpanded: Expanded, userAccess }}>
			<div className='nav'>
				<div className='logo'>
					<LogoSVG class='small' />
				</div>
				<div>
					<BetterLink to='' expandedText='Home' icon='home' />
					<BetterLink to='users' expandedText='Users' icon='group' />
					<BetterLink to='ingredients' expandedText='Ingredients' icon='eco' />
					<BetterLink to='dishes' expandedText='Dishes' icon='restaurant' />
					<SubBetterLink to='branches' expandedText='Branches' icon='store'>
						<BetterLink to='branches/reports' expandedText='Reports' icon='receipt_long' />
						<BetterLink to='branches/storage' expandedText='Storage' icon='kitchen' />
					</SubBetterLink>
					<BetterLink to='information' requiredAdmin expandedText='Information' icon='info' />
					<BetterLink to={location.pathname} expandedText='Refresh' icon='sync' onClick={refresh} />
				</div>
				<button onClick={() => setExpanded(!Expanded)}>
					{Expanded ? (
						<span className='material-symbols-outlined'>west</span>
					) : (
						<span className='material-symbols-outlined'>east</span>
					)}
				</button>
			</div>
		</navigationContext.Provider>
	);
};

export default Navigation;
