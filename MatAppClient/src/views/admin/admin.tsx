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
import useSocket from '../../hooks/useSocket';
import { Button } from '../../components/common/panel';

const Admin = () => {
  const { socket, setLoading, branches, getBranches, user, clearBranches, translate } = useAppContext();

  // TODO - dont share seters make hook?
  const [ingredients, getIngredients, clearIngredients] = useSocket<IIngredient[]>(socket, 'ingredients', []);
  const [dishes, getDishes, clearDishes] = useSocket<IDish[]>(socket, 'dishes', []);
  const [users, getUsers, clearUsers] = useSocket<IUser[]>(socket, 'users', []);
  const [branchesStorages, getBranchesStorages, clearBranchesStorage] = useSocket<IBranchData<IIngredient>[]>(socket, 'branches_storage', []);
  const [branchesOrders, getBranchesOrders, clearBranchesOrders] = useSocket<IBranchData<any>[]>(socket, 'branches_orders', []);
  const [dialog, setDialog] = useState<IDialogOption>('hidden');

  const [selectedIDs, setSelectedIDs] = useState<number[]>([]);
  const [Status, setStatus] = useState('');

  const refresh = () => {
    setSelectedIDs([]);
    clearIngredients();
    clearDishes();
    clearUsers();
    clearBranchesStorage();
    clearBranchesOrders();
    clearBranches();
  };

  const selectedItems = useMemo(() => {
    const location = window.location.pathname;
    if (location.includes('ingredients')) return ingredients.filter((ingredient) => selectedIDs.includes(ingredient.id));
    if (location.includes('dishes')) return dishes.filter((dish) => selectedIDs.includes(dish.id));
    if (location.includes('users')) return users.filter((user) => selectedIDs.includes(user.id));
    if (location.includes('storage')) return branchesStorages.filter((branch) => selectedIDs.includes(branch.id));
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
        getBranches,
        ingredients,
        getIngredients,
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
                getData={getBranches}
                displayName="Branches"
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
                    getData={getBranchesStorages}
                    displayName="Branches Storage"
                  />
                }
              />
              <Route
                path="/branches/orders"
                element={
                  <TableViewSection
                    data={branchesOrders}
                    displayName="Branches Orders"
                    getData={getBranchesOrders}
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
                displayName="Dishes"
                getData={getDishes}
                showButtons
                additionalButtons={
                  <Button onClick={() => setDialog('other')}>
                    <span className="material-symbols-outlined">category</span>
                    {translate('category')}
                  </Button>
                }
              />
            }
          />
          <Route
            path="table/ingredients"
            element={
              <TableView
                data={ingredients}
                displayName="Ingredients"
                getData={getIngredients}
                showButtons
              />
            }
          />
          <Route
            path="table/users"
            element={
              <TableView
                data={users}
                displayName="Users"
                getData={getUsers}
                showButtons
                additionalButtons={
                  <Button
                    onClick={() => setDialog('other')}
                    disabled={selectedIDs.length !== 1}
                  >
                    <span className="material-symbols-outlined">manage_accounts</span>
                    {translate('change_password')}
                  </Button>
                }
              />
            }
          />
          <Route
            path="/table"
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
