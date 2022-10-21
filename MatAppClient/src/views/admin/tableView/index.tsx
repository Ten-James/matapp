import { useContext, useState, useEffect, useMemo } from "react";
import { context } from "../../../App";
import { AdminContext } from "../admin";
import ParamButtons from "./paramButtons";
import { textUpperFirst } from "../../../misc/utils";

import "./tableView.css";

import { Button, Panel } from "../../../components/panel";
import { FilterData, BaseProp, Sort } from "../../../types";

interface Props<T> {
	data: T[];
	setData: (data: T[]) => void;
	socketString: string;
	displayName: string;
}

const MakeSort = <T extends BaseProp>(e: string, t: string, ord: boolean) => {
	if (ord) {
		if (t === "string") {
			// @ts-ignore
			return (a: T, b: T): number => a[e].localeCompare(b[e]);
		}
		// @ts-ignore
		return (a: T, b: T): number => a[e] - b[e];
	} else {
		if (t === "string") {
			// @ts-ignore
			return (a: T, b: T): number => b[e].localeCompare(a[e]);
		}
		// @ts-ignore
		return (a: T, b: T): number => b[e] - a[e];
	}
};

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
		setData(data);
		setShow(data.filter(filter.filterMatch).sort(filter.sort));
	});

	useMemo(() => {
		if (data.length === 0) return setShow([]);
		setShow(data.filter(filter.filterMatch).sort(filter.sort));
	}, [filter, data]);

	useEffect(() => {
		if (data.length === 0) {
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
							width: "90%",
							margin: "0.3em auto",
							gridTemplateColumns: "repeat(" + Object.keys(show[0]).length.toString() + ", 1fr)",
						}}
					>
						{Object.keys(show[0]).map((e) => (
							<div key={e}>
								<div className='d-table-header-label'>
									{textUpperFirst(e)}
									<span
										className='material-symbols-outlined d-table-header-asc'
										onClick={() => {
											setFilter({
												filterMatch: filter.filterMatch,
												sort: MakeSort(e, typeof show[0][e], true),
											});
										}}
									>
										expand_more
									</span>
									<span
										className='material-symbols-outlined d-table-header-dsc'
										onClick={() => {
											setFilter({
												filterMatch: filter.filterMatch,
												sort: MakeSort(e, typeof show[0][e], false),
											});
										}}
									>
										expand_less
									</span>
								</div>
							</div>
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
							width: "90%",
							gridTemplateColumns: "repeat(" + Object.keys(show[0]).length.toString() + ", 1fr)",
							outline: selectedIDs.includes(e.id) ? "1px solid #6bb0b3" : "unset",
							padding: "0.5em 1em",
							margin: "0.4em auto",
						}}
						key={e.id}
						class='inset'
					>
						{Object.keys(e).map((f) => (
							// @ts-ignore
							<div key={f}>{e[f]}</div>
						))}
					</Panel>
				))}
			</div>
			<div className='d-buttons'>
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
