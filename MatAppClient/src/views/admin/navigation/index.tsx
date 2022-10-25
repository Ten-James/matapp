import { useLocation } from "react-router-dom";
import { useState, createContext, useContext } from "react";
import { BetterLink, SubBetterLink } from "./betterLinks";

import "./navigation.css";
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
			<div>
				<div className='nav'>
					<div className='nav-container'>
						<div className='logo' onClick={() => setExpanded(!Expanded)}>
							<LogoSVG class='small' />
						</div>
						<div style={{ transform: Expanded ? "translateX(1em)" : "translateX(-0.2em)" }}>
							<SubBetterLink to='branches' expandedText='Branches' icon='store' count={2}>
								<BetterLink
									to='branches/reports'
									expandedText='Reports'
									icon='receipt_long'
									onClick={() => setExpanded(false)}
								/>
								<BetterLink
									to='branches/storage'
									expandedText='Storage'
									icon='warehouse'
									onClick={() => setExpanded(false)}
								/>
							</SubBetterLink>
							<SubBetterLink to='table' expandedText='Table' icon='storage' count={3}>
								<BetterLink to='table/users' expandedText='Users' icon='group' onClick={() => setExpanded(false)} />
								<BetterLink
									to='table/ingredients'
									expandedText='Ingredients'
									icon='kitchen'
									onClick={() => setExpanded(false)}
								/>
								<BetterLink to='table/dishes' expandedText='Dishes' icon='restaurant' onClick={() => setExpanded(false)} />
							</SubBetterLink>
							<BetterLink
								to='information'
								requiredAdmin
								expandedText='Information'
								icon='info'
								onClick={() => setExpanded(false)}
							/>
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
				</div>
			</div>
		</navigationContext.Provider>
	);
};

export default Navigation;
