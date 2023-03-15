import React, { useEffect, useMemo } from 'react';
import { useAppContext } from '../../../context/appContext';
import { useMainContext } from '../../../context/mainContext';

import './style.css';

const Orders = () => {
  const { socket, setShowButtons, branches, translate } = useAppContext();
  const { branchID, session } = useMainContext();
  useEffect(() => {
    setShowButtons(false);
  }, []);

  if (!session) return null;
  if (!branches) return null;
  const onGoingOrders = useMemo(() => session?.currentOrders.filter((o) => o.type === 'open').map((o) => o.displayId) || [], [session]);
  const finishedOrders = useMemo(() => session?.currentOrders.filter((o) => o.type === 'submitted').map((o) => o.displayId) || [], [session]);

  return (
    <div className="orders-container">
      <h1>
        {branches.find((b) => b.id === branchID)?.name || 'not found'} {translate('orders')}
      </h1>
      <h3 className="title">{translate('preparing')}</h3>
      <div className="ongoing-orders">
        {onGoingOrders.map((o) => (
          <div key={o}>
            <div>{o}</div>
          </div>
        ))}
      </div>
      <h3 className="title">{translate('to_claim')}</h3>
      <div className="finished-orders">
        {finishedOrders.map((o) => (
          <div
            onClick={() => socket.emit('order_finish', session?.currentOrders.find((co) => co.displayId === o)?.id)}
            key={o}
          >
            <div>{o}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
