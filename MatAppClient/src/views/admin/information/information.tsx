import { useContext, useEffect, useState, useRef } from "react";

import { Panel } from "../../../components/panel";
import { context } from "../../../App";
import "./information.css";
import { Information } from "../../../types";
import { Translate } from "../../../misc/transcripter";

const InformationView = () => {
	const [Info, setInfo] = useState<Information>({
		uptime: "",
		memory: "",
		clients: 0,
		time: "",
		data: [""],
		database: [""],
	});

	const { socket, language } = useContext(context);
	socket.on("info", (data) => {
		setInfo(data);
	});

	useEffect(() => {
		socket.emit("get_info");
		const int = setInterval(() => {
			socket.emit("get_info");
		}, 5000);
		return () => clearInterval(int);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className='s-grid'>
			<h1 className='s-name'>{Translate("information", language)}</h1>
			<Panel class='s-status'>
				<h2>{Translate("Current Server info", language)}:</h2>
				{Info.uptime && (
					<div>
						{Translate("Update", language)}: {Info.uptime}
					</div>
				)}
				{Info.memory && (
					<div>
						{Translate("Memory Usage", language)}: {Info.memory}
					</div>
				)}
				{Info.clients && (
					<div>
						{Translate("Current Clients", language)}: {Info.clients}
					</div>
				)}
				{Info.time && (
					<div>
						{Translate("Updated time", language)}: {Info.time}
					</div>
				)}
			</Panel>
			<Panel class='s-data'>
				<h2>Server data log:</h2>
				<div>{Info.data && Info.data.map((e) => <div key={Info.data.indexOf(e)}>{e}</div>)}</div>
			</Panel>
			{
				<Panel class='s-database-info'>
					<h2>Database Info:</h2>

					{Info.database && (
						<>
							<div>
								{Translate("Database Size", language)}: {Info.database[0]} MB
							</div>
							<div>
								{Translate("Database Rows", language)}: {Info.database[1]}
							</div>
						</>
					)}
				</Panel>
			}
		</div>
	);
};
export default InformationView;
