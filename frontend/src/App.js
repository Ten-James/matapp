import { useState, createContext } from "react";
import { Routes, Route } from "react-router";
import "./styles/style.css";
import socketIOClient from "socket.io-client";

import { Loader } from "./views/loading";
import BranchSelector from "./views/branchSelector";
import Admin from "./views/admin/admin";
import ErrorPage from "./views/errorpage";

const socket = socketIOClient("http://localhost:2238");
export const context = createContext();

function App() {
  const [loading, setLoading] = useState(true);
  const [branches, setBranches] = useState([]);

  return (
    <context.Provider value={{ loading, branches, socket, setLoading, setBranches }}>
      <Loader>
        <Routes>
          <Route path="/branches" element={<BranchSelector branches={branches} />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Loader>
    </context.Provider>
  );
}

export default App;
