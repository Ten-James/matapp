import { useMainContext } from '../../../context/mainContext';

const Kitchen = () => {
  const { branchID, session } = useMainContext();

  return (
    <div>
      <h1>Kitchen</h1>
      <h2>Branch ID: {branchID}</h2>
      {session.currentOrders?.length !== 0 ? (
        <>
          {session.currentOrders?.map((order) => {
            return (
              <div key={order.id}>
                <h3>Order ID: {order.id}</h3>
                {order.dishes.map((dish) => {
                  return (
                    <div key={dish.id}>
                      <h4>Dish ID: {dish.id}</h4>
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
