import LogoSVG from "../components/logo";
import { Panel, Button } from "../components/panel";
import { useEffect, useContext } from "react";
import { context } from "../App";
import { GenerateFries } from "../misc/fries";
import { Branch } from "../types";
interface Props {
	branches: Branch[];
}

const BranchSelector = ({ branches }: Props) => {
	const socket = useContext(context).socket;
	const setBranches = useContext(context).setBranches;
	const setLoading = useContext(context).setLoading;
	useEffect(() => {
		GenerateFries();
		console.log("get");
		setTimeout(() => socket.emit("get_branches"), 3000);
		socket.on("branches", (data: Branch[]) => {
			console.log("set");
			setLoading(false);
			//duplicate data for testing
			setBranches(data.concat(data));
		});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className='App'>
			<Panel class='center center-child' style={{ width: "max(40vw,400px)", height: "80vh" }}>
				<LogoSVG class='upper' />
				<div className='branches'>
					{branches.map((branch) => (
						<Panel class='branch' key={branch.id}>
							<div className='branch-name'>{branch.name}</div>
							<div className='branch-location'>{branch.location}</div>
							<Button class='branch-button'>Log in</Button>
						</Panel>
					))}
				</div>
				<p>All rights reserved</p>
			</Panel>
		</div>
	);
};

export default BranchSelector;
