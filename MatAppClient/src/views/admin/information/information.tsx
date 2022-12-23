import { useContext, useEffect, useState } from 'react';

import { context } from '../../../App';
import { Panel } from '../../../components/panel';
import { Information } from '../../../types';
import './information.css';

const InformationView = () => {
  const [Info, setInfo] = useState<Information>({
    uptime: '',
    memory: '',
    clients: 0,
    time: '',
    data: [''],
    database: [''],
  });

  const { socket, translate } = useContext(context);
  socket.on('info', (data) => {
    setInfo(data);
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
          <div>
            {translate('Update')}: {Info.uptime}
          </div>
        )}
        {Info.memory && (
          <div>
            {translate('Memory Usage')}: {Info.memory}
          </div>
        )}
        {Info.clients && (
          <div>
            {translate('Current Clients')}: {Info.clients}
          </div>
        )}
        {Info.time && (
          <div>
            {translate('Updated time')}: {Info.time}
          </div>
        )}
      </Panel>
      <Panel class="s-data">
        <h2>Server data log:</h2>
        <div>{Info.data && Info.data.map((e) => <div key={Info.data.indexOf(e)}>{e}</div>)}</div>
      </Panel>
      {
        <Panel class="s-database-info">
          <h2>Database Info:</h2>

          {Info.database && (
            <>
              <div>
                {translate('Database Size')}: {Info.database[0]} MB
              </div>
              <div>
                {translate('Database Rows')}: {Info.database[1]}
              </div>
            </>
          )}
        </Panel>
      }
    </div>
  );
};
export default InformationView;
