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
          const ing = dish.ingredients.find((ing) => ing === name);
          if (ing === undefined) return acc;
          return acc - dishCount;
        }, count);
        return { name, count: newCount };
      }),
    [dataAccurateStorage, currentOrderDishes],
  );

  const availableDishes = useMemo(() => {
    if (currentStorage === undefined) return [];
    return dishes.filter((dish) => {
      const ing = dish.ingredients.map((ing) => currentStorage.find((st) => st.name === ing));
      return ing.every((ing) => ing !== undefined && ing.count > 0);
    });
  }, [currentStorage]);

  //testing purposes
  const showDishesAll = useMemo(() => {
    if (selectedCategory === undefined) return [];
    return dishes.filter((dish) => dish.category === selectedCategory);
  }, [selectedCategory, dishes]);

  const showDishes = useMemo(() => {
    if (selectedCategory === undefined) return [];
    return availableDishes.filter((dish) => dish.category === selectedCategory);
  }, [selectedCategory, availableDishes]);

  useEffect(() => {
    if (session === null) throw new Error('Session is null');
    getCategories();
    getDishes();
    getStorage(branchID);
  }, []);

  useEffect(() => {
    setSelectedCategory(categories[0]?.name);
  }, [categories]);

  useEffect(() => {
    setTimeout(() => {
      setCurrentOrder({
        date: new Date().toString(),
        dishes: [{ id: 5, count: 1 }],
        id: 1,
        cost: 0,
        type: 'normal',
      } as IOrder);
    }, 1000);
  }, []);

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
              <span className="material-symbols-outlined">{category.icon}</span>
              <h3 style={{ fontWeight: selectedCategory === category.name ? 'bold' : 'normal' }}>{category.name}</h3>
            </div>
          ))}
        </div>
        <div className="dishes">
          <div>{JSON.stringify(showDishesAll)}</div>
          <div>{JSON.stringify(showDishes)}</div>
          <div>{JSON.stringify(dataAccurateStorage)}</div>
          <div>{JSON.stringify(currentStorage)}</div>
        </div>
        <div className="info">
          <p>time {new Date(session.startTime).toLocaleString()}</p>
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
                      <div className="order-dish-button">x</div>
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
                  <button className="order-button">decline</button>
                  <button className="order-button">tip</button>
                  <button className="order-button">Pay</button>
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
