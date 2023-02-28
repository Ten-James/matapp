import { useEffect, useState } from 'react';
import { Button, Panel } from '../../../components/common/panel';
import { Information } from '../../../types';
import './information.css';
import { useAppContext } from '../../../context/appContext';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { fillArrayWithNulls } from '../../../misc/utils';

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

  const [data, setData] = useState<string>('');

  const [visiblePanel, setVisiblePanel] = useState<'log' | 'data'>('log');

  const { socket, translate } = useAppContext();
  socket.on('info', (data) => {
    setInfo(data);
  });

  socket.on('data', (data: string) => {
    setData(data);
  });

  useEffect(() => {
    socket.emit('get_info');
    const int = setInterval(() => {
      socket.emit('get_info');
      if (visiblePanel === 'data') socket.emit('get_data');
    }, 5000);

    socket.emit('get_info');
    if (visiblePanel === 'data') socket.emit('get_data');
    return () => clearInterval(int);
  }, [visiblePanel]); // eslint-disable-line react-hooks/exhaustive-deps

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
        <div>
          <Button
            onClick={() => setVisiblePanel('log')}
            style={{ height: '4em', width: '10em', display: 'inline-flex' }}
          >
            Log
          </Button>
          <Button
            onClick={() => setVisiblePanel('data')}
            style={{ height: '4em', marginLeft: '1em', width: '10em', display: 'inline-flex' }}
          >
            Actual data
          </Button>
        </div>
        {visiblePanel === 'log' ? (
          <>
            <h2>Server data log:</h2>
            <div className="scrollable">{Info.data && Info.data.map((e) => <p key={Info.data.indexOf(e)}>{e}</p>)}</div>
          </>
        ) : (
          <>
            <h2>Actual data:</h2>
            <div className="scrollable">
              <code>{data}</code>
            </div>
          </>
        )}
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
            data={Object.entries(fillArrayWithNulls(Info.timeLog))}
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
