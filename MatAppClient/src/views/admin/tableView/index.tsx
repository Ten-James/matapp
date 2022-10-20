import { useContext, useState, useEffect, useMemo } from "react";
import { context } from "../../../App";
import { AdminContext } from "../admin";
import ParamButtons from "./paramButtons";
import { textUpperFirst } from "../../../misc/utils";

import "../../../styles/admin/ingredients.css";

import { Button, Panel } from "../../../components/panel";
import { FilterData, BaseProp, Sort } from "../../../types";

interface Props<T> {
	data: T[];
	setData: (data: T[]) => void;
	socketString: string;
	displayName: string;
}

const TableView = <T extends BaseProp>({ data, setData, socketString, displayName }: Props<T>) => {
	const { selectedIDs, setSelectedIDs } = useContext(AdminContext);
	const { socket } = useContext(context);

	const [show, setShow] = useState(data);
	const [sort, setSort] = useState<Sort[]>([{ name: "id", type: "number" }]);
	const [categories, setCategories] = useState<string[]>([]);

	const [filter, setFilter] = useState<FilterData<T>>({
		filterMatch: (x) => true,
		sort: (a, b) => 1,
	});

	socket.on(socketString, (data: T[]) => {
		console.log("getting data");
		setData(data);
		setShow(data.filter(filter.filterMatch).sort(filter.sort));
	});

	useMemo(() => {
		if (data.length === 0) return setShow([]);
		setShow(data.filter(filter.filterMatch).sort(filter.sort));
	}, [filter, data]);

	useEffect(() => {
		if (data.length === 0) {
			console.log("no data");
			socket.emit(`get_${socketString}`);
		}
		setSelectedIDs([]);
		setFilter({
			filterMatch: (x) => true,
			sort: (a, b) => 1,
		});
		if (data.length === 0) return;
		// @ts-ignore
		setSort(Object.keys(data[0]).map<Sort>((e) => ({ name: e, type: typeof data[0][e] })));
		// @ts-ignore
		setCategories(data.map((e) => e.category).filter((e, i, a) => a.indexOf(e) === i));
	}, [data]);

	return (
		<div className='d-grid'>
			<h1 className='d-name'>{displayName}</h1>
			<div className='d-parameters'>
				<ParamButtons
					filter={filter}
					setFilter={setFilter}
					sorts={sort}
					showCategory={categories.length > 1}
					categories={categories}
				/>
			</div>
			<div className='d-table-header'>
				{show.length > 0 && (
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(" + Object.keys(show[0]).length.toString() + ", 1fr)",
						}}
					>
						{Object.keys(show[0]).map((e) => (
							<div key={e}>{textUpperFirst(e)}</div>
						))}
					</div>
				)}
			</div>
			<div
				className='d-table-content'
				style={{
					overflowY: "scroll",
					height: "100%",
				}}
			>
				{show.map((e) => (
					<Panel
						onClick={() =>
							setSelectedIDs(selectedIDs.includes(e.id) ? selectedIDs.filter((x) => x !== e.id) : [...selectedIDs, e.id])
						}
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(" + Object.keys(show[0]).length.toString() + ", 1fr)",
							outline: selectedIDs.includes(e.id) ? "1px solid #6bb0b3" : "unset",
							padding: "0.5em",
						}}
						key={e.id}
					>
						{Object.keys(e).map((f) => (
							// @ts-ignore
							<div key={f}>{e[f]}</div>
						))}
					</Panel>
				))}
			</div>
			<div className='d-buttons'>
				{JSON.stringify(selectedIDs)}
				<Button>
					<span className='material-symbols-outlined'>add</span>
					Add
				</Button>
				<Button>
					<span className='material-symbols-outlined'>edit</span>
					Edit
				</Button>
				<Button>
					<span className='material-symbols-outlined'>delete</span>
					Delete
				</Button>
			</div>
		</div>
	);
};

export default TableView;
