import { createContext, FormEvent, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { GenerateFries } from '../../misc/fries';
import type { AdminContextType, IDialogOption, IBranch, IBranchData, IDish, IIngredient, IUser } from '../../types';
import Dialog from './dialog';
import InformationView from './information/information';
import Navigation from './navigation';
import TableView from './tableView/';
import TableViewDishes from './tableView/tableViewDishes';
import TableViewSection from './tableView/tableViewSection';
import AdminDefaultView from './default';
import { useAppContext } from '../../context/appContext';
import { AdminContext } from '../../context/adminContext';

const Admin = () => {
  const { socket, setLoading, branches, setBranches, user, setUser } = useAppContext();

  const [ingredients, setIngredients] = useState<IIngredient[]>([]);
  const [dishes, setDishes] = useState<IDish[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [branchesStorages, setBranchesStorages] = useState<IBranchData<IIngredient>[]>([]);
  const [branchesOrders, setBranchesOrders] = useState<IBranchData<any>[]>([]);
  const [dialog, setDialog] = useState<IDialogOption>('hidden');

  const [selectedIDs, setSelectedIDs] = useState<number[]>([]);
  const [Status, setStatus] = useState('');

  const refresh = () => {
    setSelectedIDs([]);
    setIngredients([]);
    setDishes([]);
    setUsers([]);
    setBranches([]);
    setBranchesStorages([]);
    setBranchesOrders([]);
  };

  const selectedItems = useMemo(() => {
    const location = window.location.pathname;
    if (location.includes('ingredients')) return ingredients.filter((ingredient) => selectedIDs.includes(ingredient.id));
    if (location.includes('dishes')) return dishes.filter((dish) => selectedIDs.includes(dish.id));
    if (location.includes('users')) return users.filter((user) => selectedIDs.includes(user.id));
    if (location.includes('branches')) return branches.filter((branch) => selectedIDs.includes(branch.id));
    return [];
  }, [selectedIDs, ingredients, dishes, users, branches, branchesStorages, branchesOrders]);

  useEffect(() => {
    GenerateFries();
    setTimeout(() => setLoading(false), 1000);
  }, [setLoading]);

  return (
    <AdminContext.Provider
      value={{
        selectedItems,
        selectedIDs,
        setSelectedIDs,
        refresh,
        dialog,
        setDialog,
        branches,
        setBranches,
      }}
    >
      {dialog !== 'hidden' && <Dialog />}
      <div className="App App-grid">
        <Navigation userAccess={user.access} />
        <Routes>
          <Route
            path="/branches"
            element={
              <TableView
                data={branches}
                setData={setBranches}
                displayName="Branches"
                socketString="branches"
                showButtons
              />
            }
          />
          {user.access === 2 ? (
            <>
              <Route
                path="/branches/storage"
                element={
                  <TableViewSection
                    data={branchesStorages}
                    setData={setBranchesStorages}
                    displayName="Branches Storage"
                    socketString="branches_storage"
                  />
                }
              />
              <Route
                path="/branches/orders"
                element={
                  <TableViewSection
                    data={branchesOrders}
                    setData={setBranchesOrders}
                    displayName="Branches Orders"
                    socketString="branches_orders"
                  />
                }
              />
            </>
          ) : (
            <>
              <Route
                path="/branches/storage"
                element={<>test storage</>}
              />
              <Route
                path="/branches/orders"
                element={<>test</>}
              />
            </>
          )}

          <Route
            path="table/dishes"
            element={
              <TableViewDishes
                data={dishes}
                setData={setDishes}
                displayName="Dishes"
                socketString="dishes"
                showButtons
              />
            }
          />
          <Route
            path="table/ingredients"
            element={
              <TableView
                data={ingredients}
                setData={setIngredients}
                displayName="Ingredients"
                socketString="ingredients"
                showButtons
              />
            }
          />
          <Route
            path="table/users"
            element={
              <TableView
                data={users}
                setData={setUsers}
                displayName="Users"
                socketString="users"
                showButtons
              />
            }
          />
          <Route
            path="/information"
            element={<InformationView />}
          />
          <Route
            path="/"
            element={<AdminDefaultView />}
          />
        </Routes>
      </div>
    </AdminContext.Provider>
  );
};
export default Admin;
