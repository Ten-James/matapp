import { useEffect, useMemo, useState } from 'react';
import { useMainContext } from '../../../context/mainContext';
import { IBranchData, IDish, IDishCategory, IIngredient, IOrder, ISession } from '../../../types';
import { useAppContext } from '../../../context/appContext';
import useSocket from '../../../hooks/useSocket';
import './style.css';

const Cashier = () => {
  const { socket } = useAppContext();
  const { branchID, session, setSession, getSession } = useMainContext();
  const [categories, getCategories] = useSocket<IDishCategory[]>(socket, 'dish_categories_without_empty', []);
  const [dishes, getDishes] = useSocket<IDish[]>(socket, 'dishes', []);
  const [storage, getStorage] = useSocket<IBranchData<IIngredient>>(socket, 'branch_storage', undefined);

  const [selectedCategory, setSelectedCategory] = useState<String | undefined>(undefined);
  const [currentOrder, setCurrentOrder] = useState<IOrder | undefined>();

  const currentOrderDishes = useMemo(() => {
    if (currentOrder === undefined) return [];
    return currentOrder.dishes.map((dish) => [dishes.find((d) => d.id === dish.id), dish.count] as const);
  }, [currentOrder]);

  const dataAccurateStorage = useMemo(() => {
    if (storage === undefined) return [];
    console.log(storage);
    return storage.data.map((ing) => {
      return { name: ing.name, count: ing.count } as const;
    });
  }, [storage]);

  const currentStorage = useMemo(
    () =>
      dataAccurateStorage.map(({ name, count }) => {
        const newCount = currentOrderDishes.reduce((acc, [dish, dishCount]) => {
          if (dish === undefined) return acc;
          const ing = dish.ingredients.find((ing) => ing.name === name);
          if (ing === undefined) return acc;
          return acc - dishCount * ing.count;
        }, count);
        return { name, count: newCount };
      }),
    [dataAccurateStorage, currentOrderDishes],
  );

  const availableDishes = useMemo(() => {
    if (currentStorage === undefined) return [];
    return dishes.filter((dish) => {
      const ing = dish.ingredients.map((ing) => [currentStorage.find((st) => st.name === ing.name)?.count || 0, ing.count] as const);
      return ing.every(([have, need]) => have !== undefined && have > need);
    });
  }, [currentStorage]);

  const showDishes = useMemo(() => {
    if (selectedCategory === undefined) return [];
    return dishes.filter((dish) => dish.category === selectedCategory);
  }, [selectedCategory, dishes]);

  useEffect(() => {
    if (session === null) throw new Error('Session is null');
    getCategories();
    getDishes();
    getStorage(branchID);
  }, []);

  useEffect(() => {
    setSelectedCategory(categories[0]?.name);
  }, [categories]);

  return (
    <div>
      <div className="layout">
        <h1 className="header">Cashier</h1>
        <div className="categories">
          {categories?.map((category) => (
            <div
              className="category"
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
            >
              <span
                style={{ fontSize: selectedCategory === category.name ? '3.5em' : '3em' }}
                className="material-symbols-outlined"
              >
                {category.icon}
              </span>
              <h3 style={{ fontWeight: selectedCategory === category.name ? 'bold' : '200' }}>{category.name}</h3>
            </div>
          ))}
        </div>
        <div className="dishes">
          {showDishes
            .map((dish) => [dish, availableDishes.find((d) => d.id === dish.id) !== undefined] as const)
            .map(([dish, exist]) => (
              <div
                style={{ opacity: exist ? '1' : '0.25' }}
                key={dish.id}
                className="dish"
                onClick={() => {
                  if (!exist) return;
                  if (currentOrder === undefined)
                    setCurrentOrder({
                      date: new Date().toString(),
                      dishes: [],
                      id: 0,
                      cost: 0,
                      type: 'normal',
                    } as IOrder);
                  if (currentOrder.dishes.find((d) => d.id === dish.id) === undefined) {
                    setCurrentOrder({ ...currentOrder, dishes: [...currentOrder.dishes, { id: dish.id, count: 1 }] });
                    return;
                  }
                  const newDishes = currentOrder.dishes.map((d) => {
                    if (d.id === dish.id) return { ...d, count: d.count + 1 };
                    return d;
                  });
                  setCurrentOrder({ ...currentOrder, dishes: newDishes });
                }}
              >
                <h3>{dish.name}</h3>
                <p>{dish.cost}</p>
              </div>
            ))}
        </div>
        <div className="info">
          <p>time {new Date(session.startTime).toLocaleString()}</p>
          <div className="storage-table-container">
            <table className="storage-table">
              <thead>
                <tr>
                  <th>name</th>
                  <th>count</th>
                  <th>after</th>
                </tr>
              </thead>
              {dataAccurateStorage.map(({ name, count }) =>
                count !== 0 ? (
                  <tr>
                    <td>{name}:</td>
                    <td style={{ textAlign: 'right' }}> {count}</td>
                    <td style={{ textAlign: 'right' }}>{currentStorage.find((st) => st.name === name)?.count}</td>
                  </tr>
                ) : null,
              )}
            </table>
          </div>
        </div>
        <div className="order">
          {currentOrder && currentOrderDishes.length !== 0 ? (
            <>
              <div className="order-container">
                <div className="order-dishes">
                  {currentOrderDishes?.map(([dish, count]) => (
                    <div
                      className="order-dish"
                      key={dish.id}
                    >
                      <span className="order-dish-name">{dish.name}</span>
                      <div
                        className="order-dish-button"
                        onClick={() => {
                          if (currentOrder === undefined) return;
                          const newDishes = currentOrder.dishes
                            .map((d) => {
                              if (d.id === dish.id) return { ...d, count: d.count - 1 };
                              return d;
                            })
                            .filter((d) => d.count !== 0);
                          setCurrentOrder({ ...currentOrder, dishes: newDishes });
                        }}
                      >
                        x
                      </div>
                      <span className="order-dish-price">cost: {dish.cost}</span>
                      <span className="order-dish-quantity">{count}x</span>
                      <span className="order-dish-total">{dish.cost * count}</span>
                    </div>
                  ))}
                </div>
                <div className="line"></div>
                <div className="order-total">
                  <span className="order-total-name">Total</span>
                  <span className="order-total-price">{currentOrderDishes.reduce((acc, dish) => acc + dish[0].cost * dish[1], 0)}</span>
                </div>
                <div className="order-buttons">
                  <button
                    onClick={() => {
                      setCurrentOrder(undefined);
                    }}
                    className="order-button"
                  >
                    decline
                  </button>
                  <button className="order-button">tip</button>
                  <button
                    onClick={() => {
                      if (currentOrder === undefined) return;
                      socket.emit('order', branchID, currentOrder);
                      socket.on('admin_status', (status) => {
                        if (status === 'order_success') {
                          setCurrentOrder(undefined);
                        }
                      });
                    }}
                    className="order-button"
                  >
                    Pay
                  </button>
                </div>
              </div>
            </>
          ) : (
            <span className="no-order-icon material-symbols-outlined">remove_shopping_cart</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cashier;
