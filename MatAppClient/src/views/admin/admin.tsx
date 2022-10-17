import { context } from "../../App";
import { useContext, useEffect, useState, useRef, createContext, FormEvent } from "react";
import { Routes, Route } from "react-router-dom";

import InformationView from "./information";
import TableView from "./tableview/tableView";
import Navigation from "./navigation";
import { AdminContext, Ingredient, User } from "../../types";

const defaultData: AdminContext = {
  SelectedRow: [],
  setSelectedRow: () => {},
};

export const AdminContexter = createContext(defaultData);

const Admin = () => {
  const setLoading = useContext(context).setLoading;
  const socket = useContext(context).socket;

  const [Ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [SelectedRow, setSelectedRow] = useState<number[]>([]);
  const [User, setUser] = useState<User | null>(null);
  const [Status, setStatus] = useState("");

  const nameRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setLoading(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  socket.on("login", (data) => {
    if (data.status) {
      setUser(data.user);
    } else {
      setStatus("Wrong password or username");
    }
  });

  if (!User) {
    const Login = (e: FormEvent) => {
      e.preventDefault();
      if (!nameRef.current || !passRef.current) return;
      socket.emit("login", {
        name: nameRef.current.value,
        pass: passRef.current.value,
      });
    };
    return (
      <div className="App App-grid">
        <Navigation user={0} />
        <form onSubmit={Login}>
          <h1>Log in:</h1>
          <input ref={nameRef} type="text" placeholder="Branch Username" />
          <input ref={passRef} type="password" placeholder="Password" />
          <div>{Status}</div>
          <button>Log in</button>
        </form>
      </div>
    );
  }
  return (
    <AdminContexter.Provider value={{ SelectedRow, setSelectedRow }}>
      <div className="App App-grid">
        <Navigation user={User.access} />
        <Routes>
          <Route path="/branches" element={<h2>Branches</h2>} />
          <Route
            path="/ingredients"
            element={<TableView data={Ingredients} setData={setIngredients} displayName="Ingredients" socketString="ingredients" />}
          />
          <Route path="/information" element={<InformationView />} />
        </Routes>
      </div>
    </AdminContexter.Provider>
  );
};
export default Admin;
