import { useEffect, useMemo } from 'react';
import { useAppContext } from '../../../context/appContext';
import { useMainContext } from '../../../context/mainContext';
import useSocket from '../../../hooks/useSocket';
import { IDish } from '../../../types';

const Kitchen = () => {
  const { socket } = useAppContext();
  const { branchID, session } = useMainContext();
  const [dishes, getDishes] = useSocket<IDish[]>(socket, 'dishes', []);

  useEffect(() => {
    getDishes();
  }, []);

  const currentOrders = useMemo(() => {
    if (session === null) return [];
    return session.currentOrders.map((order) => {
      return {
        ...order,
        dishes: order.dishes.map((dish) => {
          return dishes.find((d) => d.id === dish.id) || ({ id: dish.id, name: 'Unknown' } as IDish);
        }),
      };
    });
  }, [session, dishes]);

  return (
    <div>
      <h1>Kitchen</h1>
      <h2>Branch ID: {branchID}</h2>
      {currentOrders?.length !== 0 ? (
        <>
          {currentOrders?.map((order) => {
            return (
              <div key={order.id}>
                <h3>Order ID: {order.id}</h3>
                {order.dishes.map((dish) => {
                  return (
                    <div key={dish.id}>
                      <h4>Dish ID: {dish.id}</h4>
                      <p>Dish name: {dish.name}</p>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </>
      ) : (
        <p>No orders</p>
      )}
    </div>
  );
};

export default Kitchen;
