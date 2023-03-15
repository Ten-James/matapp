import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppContext } from '../../../context/appContext';
import { useMainContext } from '../../../context/mainContext';
import useSocket from '../../../hooks/useSocket';
import { IDish } from '../../../types';

import './style.css';

interface IOrderStatus {
  id: number;
  dishes: {
    id: number;
    done: boolean;
  }[];
}

const Kitchen = () => {
  const { socket, translate } = useAppContext();
  const { session } = useMainContext();
  const [dishes, getDishes] = useSocket<IDish[]>(socket, 'dishes', []);
  const [orderStatus, setOrderStatus] = useState<IOrderStatus[]>([]);

  useEffect(() => {
    getDishes();
  }, []);

  if (!session) return null;

  const currentOrders = useMemo(() => {
    if (session === null) return [];
    return session.currentOrders
      .filter((o) => o.type === 'open')
      .map((order) => {
        return {
          ...order,
          dishes: order.dishes.map((dish) => {
            return [dishes.find((d) => d.id === dish.id) || ({ id: dish.id, name: 'Unknown' } as IDish), dish.count] as const;
          }),
        };
      });
  }, [session, session?.currentOrders.length, dishes]);

  const handleDishDone = useCallback((orderID: number, dishID: number) => {
    setOrderStatus((prev) => {
      const order = prev.find((o) => o.id === orderID) ? prev.find((o) => o.id === orderID) : { id: orderID, dishes: currentOrders.find((o) => o.id === orderID)?.dishes.map((d) => ({ id: d[0].id, done: false })) };
      const newOrder = { ...order, dishes: order?.dishes?.map(({ id, done }) => (id === dishID ? { id: id, done: true } : { id: id, done: done })) } as IOrderStatus;
      return [...prev.filter((o) => o.id !== orderID), newOrder];
    });
  }, []);
  return (
    <div>
      <h1>{translate('kitchen')}</h1>
      {currentOrders?.length !== 0 ? (
        <div className="kitchen-order-container">
          {currentOrders.map((order) => {
            return (
              <div
                className="kitchen-order"
                key={order.id}
              >
                <h3>{order.displayId}</h3>
                <div className="dishes">
                  {order.dishes
                    .sort(([dishA], [dishB]) => {
                      const A = orderStatus.find((o) => o.id === order.id)?.dishes.find((d) => d.id === dishA.id)?.done || false;
                      const B = orderStatus.find((o) => o.id === order.id)?.dishes.find((d) => d.id === dishB.id)?.done || false;
                      if (A && !B) return 1;
                      if (!A && B) return -1;
                      return 0;
                    })
                    .map(([dish, count]) => {
                      return (
                        <div
                          onClick={() => handleDishDone(order.id, dish.id)}
                          style={{ opacity: orderStatus.find((o) => o.id === order.id)?.dishes.find((d) => d.id === dish.id)?.done || false ? '0.25' : '1' }}
                          key={dish.id}
                        >
                          <p>
                            {count}x {dish.name}
                          </p>
                        </div>
                      );
                    })}
                </div>
                {orderStatus.find((o) => o.id === order.id)?.dishes.every((d) => d.done) ? (
                  <p
                    className="finish-order"
                    onClick={() => {
                      socket.emit('order_done', order.id);
                    }}
                  >
                    {translate('finish_order')}
                  </p>
                ) : (
                  <p className="finish-order">{translate('work_on_order')}</p>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p>{translate('no_orders')}</p>
      )}
    </div>
  );
};

export default Kitchen;
