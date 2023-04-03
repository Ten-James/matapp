import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../../context/appContext';
import BranchSelector from '../../main/branchSelector';

import './reports.css';
import { Panel } from '../../../components/common/panel';
import { IDish, IReportData } from '../../../types';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import useSocket from '../../../hooks/useSocket';

const Reports: React.FC<{ data: IReportData; getData: (branchId: number, sessionId: number) => void }> = ({ data, getData }) => {
  const { user, translate, socket } = useAppContext();
  if (!user) throw Error('User is null');

  const [dishes, getDishes] = useSocket<IDish[]>(socket, 'dishes', []);
  const [branchId, setBranchId] = useState<number>(user.branchId || 0);
  const [sessionId, setSessionId] = useState<number>(0);

  useEffect(() => getDishes);

  useEffect(() => {
    if (branchId !== 0) getData(branchId, sessionId);
  }, [branchId, sessionId]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return branchId === 0 ? (
    <BranchSelector setBranchID={setBranchId} />
  ) : (
    <div className="r-grid">
      <h1 className="r-name">{translate('reports')}</h1>
      <Panel class="r-sessions">
        <h2>{translate('sessions')}</h2>
        <div className="scrollable">
          {data.sessions.map((s) => (
            <Panel
              onClick={() => {
                setSessionId(s.id);
              }}
              key={s.id}
            >
              {s.startTime}
              {s.endTime ? ' - ' + s.endTime : ''}
            </Panel>
          ))}
        </div>
      </Panel>
      <Panel class="r-orders">
        <div className="scrollable">
          {data.orders.map((o) => (
            <Panel key={o.id}>
              <div>
                <h3>
                  {new Date(o.date).toLocaleDateString()}: {new Date(o.date).toLocaleTimeString()}
                </h3>
                <p>{o.dishes.map((d) => d.count + 'x ' + (dishes.find((dish) => dish.id === d.id) || { name: 'unknown' }).name).join(', ')}</p>
                <p>{translate("cost")}: {o.dishes.reduce((a, b) => a + b.count * (dishes.find((d) => d.id === b.id) || { cost: 0 }).cost, 0)}</p>
              </div>
            </Panel>
          ))}
        </div>
      </Panel>
      <Panel class="r-graph">
        <h2>{translate("cost-of-orders")}</h2>
        <ResponsiveContainer
          width="100%"
          height="90%"
        >
          <LineChart
            width={500}
            height={500}
            data={data.orders.map((o) => [new Date(o.date).toLocaleTimeString(), o.dishes.reduce((a, b) => a + b.count * (dishes.find((d) => d.id === b.id) || { cost: 0 }).cost, 0)])}
          >
            <XAxis dataKey="0" />
            <YAxis />
            <Line
              dataKey="1"
              dot
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

export default Reports;
