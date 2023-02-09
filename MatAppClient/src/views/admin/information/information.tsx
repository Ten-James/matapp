import { useEffect, useState } from 'react';
import { Panel } from '../../../components/common/panel';
import { Information } from '../../../types';
import './information.css';
import { useAppContext } from '../../../context/appContext';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const InformationView = () => {
  const [Info, setInfo] = useState<Information>({
    uptime: '',
    memory: '',
    clients: 0,
    time: '',
    data: [''],
    database: [''],
    timeLog: {},
  });

  const { socket, translate } = useAppContext();
  socket.on('info', (data) => {
    setInfo(data);
    console.log(Object.entries(data.timeLog));
  });

  useEffect(() => {
    socket.emit('get_info');
    const int = setInterval(() => {
      socket.emit('get_info');
    }, 5000);
    return () => clearInterval(int);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="s-grid">
      <h1 className="s-name">{translate('information')}</h1>
      <Panel class="s-status">
        <h2>{translate('Current Server info')}:</h2>
        {Info.uptime && (
          <p>
            {translate('Update')}: {Info.uptime}
          </p>
        )}
        {Info.memory && (
          <p>
            {translate('Memory Usage')}: {Info.memory}
          </p>
        )}
        {Info.clients && (
          <p>
            {translate('Current Clients')}: {Info.clients}
          </p>
        )}
        {Info.time && (
          <p>
            {translate('Updated time')}: {Info.time}
          </p>
        )}

        <h2>{translate('database info')}:</h2>

        {Info.database && (
          <>
            <p>
              {translate('Database Size')}: {Info.database[0]} MB
            </p>
            <p>
              {translate('Database Rows')}: {Info.database[1]}
            </p>
          </>
        )}
      </Panel>
      <Panel class="s-data">
        <h2>Server data log:</h2>
        <div>{Info.data && Info.data.map((e) => <p key={Info.data.indexOf(e)}>{e}</p>)}</div>
      </Panel>
      <Panel class="s-database-info">
        <h2>{translate('count of request')}:</h2>
        <ResponsiveContainer
          width="100%"
          height="100%"
          maxHeight={150}
        >
          <LineChart
            width={500}
            height={500}
            data={Object.entries(Info.timeLog)}
          >
            <XAxis dataKey="0" />
            <YAxis />
            <Line
              dataKey="1"
              dot={false}
              type="monotone"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </Panel>
    </div>
  );
};
export default InformationView;
