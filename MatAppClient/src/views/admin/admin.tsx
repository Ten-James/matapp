import { createContext, FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { context } from '../../App';

import { GenerateFries } from '../../misc/fries';
import type { AdminContextType, IDialogOption, IBranch, IBranchData, IDish, IIngredient, IUser } from '../../types';
import Dialog from './dialog';
import InformationView from './information/information';
import Navigation from './navigation';
import TableView from './tableView/';
import TableViewDishes from './tableView/tableViewDishes';
import TableViewSection from './tableView/tableViewSection';

const defaultData: AdminContextType = {
  selectedIDs: [],
  setSelectedIDs: () => {},
  refresh: () => {},
  dialog: 'hidden',
  setDialog: () => {},
  branches: [],
  setBranches: () => {},
};

export const AdminContext = createContext(defaultData);

const Admin = () => {
  const setLoading = useContext(context).setLoading;
  const socket = useContext(context).socket;

  const [ingredients, setIngredients] = useState<IIngredient[]>([]);
  const [dishes, setDishes] = useState<IDish[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [branches, setBranches] = useState<IBranch[]>([]);
  const [branchesStorages, setBranchesStorages] = useState<IBranchData<IIngredient>[]>([]);
  const [branchesOrders, setBranchesOrders] = useState<IBranchData<any>[]>([]);
  const [dialog, setDialog] = useState<IDialogOption>('hidden');

  const [selectedIDs, setSelectedIDs] = useState<number[]>([]);
  const [user, setUser] = useState<IUser>({
    id: 1,
    name: 'admin',
    access: 2,
    branchId: 0,
  });
  const [Status, setStatus] = useState('');

  const refresh = () => {
    setSelectedIDs([]);
    setIngredients([]);
  };

  const nameRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    GenerateFries();
    setTimeout(() => setLoading(false), 1000);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  socket.on('login', (data) => {
    if (data.status) {
      setUser(data.user);
    } else {
      setStatus('Wrong password or username');
    }
  });

  if (!user) {
    const Login = (e: FormEvent) => {
      e.preventDefault();
      if (!nameRef.current || !passRef.current) return;
      socket.emit('login', {
        name: nameRef.current.value,
        pass: passRef.current.value,
      });
    };
    return (
      <div className="App App-grid">
        <Navigation userAccess={0} />
        <form onSubmit={Login}>
          <h1>Log in:</h1>
          <input
            ref={nameRef}
            type="text"
            placeholder="Branch Username"
          />
          <input
            ref={passRef}
            type="password"
            placeholder="Password"
          />
          <div>{Status}</div>
          <button>Log in</button>
        </form>
      </div>
    );
  }
  return (
    <AdminContext.Provider
      value={{
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
              />
            }
          />
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

          <Route
            path="table/dishes"
            element={
              <TableViewDishes
                data={dishes}
                setData={setDishes}
                displayName="Dishes"
                socketString="dishes"
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
              />
            }
          />
          <Route
            path="/information"
            element={<InformationView />}
          />
        </Routes>
      </div>
    </AdminContext.Provider>
  );
};
export default Admin;
