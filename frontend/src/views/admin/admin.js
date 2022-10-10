import { context } from "../../App";
import { useContext, useEffect, useState, useRef, createContext } from "react";
import { Routes, Route } from "react-router-dom";

import InformationView from "./information";
import IngredientsView from "./ingredients";
import Navigation from "./navigation";

export const AdminContext = createContext();

const Admin = () => {
  const setLoading = useContext(context).setLoading;
  const socket = useContext(context).socket;

  const [Ingredients, setIngredients] = useState([]);
  const [Selected, setSelected] = useState([]);
  const [User, setUser] = useState(null);
  const [Status, setStatus] = useState("");

  const nameRef = useRef(null);
  const passRef = useRef(null);
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
    const Login = (e) => {
      e.preventDefault();
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
    <AdminContext.Provider value={{ Ingredients, setIngredients, Selected, setSelected }}>
      <div className="App App-grid">
        <Navigation user={User.access} />
        <Routes>
          <Route path="/branches" element={<h2>Branches</h2>} />
          <Route path="/ingredients" element={<IngredientsView />} />
          <Route path="/information" element={<InformationView />} />
        </Routes>
      </div>
    </AdminContext.Provider>
  );
};
export default Admin;
