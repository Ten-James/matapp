import React, { useState, createContext } from "react";
import { Routes, Route } from "react-router";
import "./styles/style.css";
import socketIOClient, { Socket } from "socket.io-client";

import Loader from "./views/loading";
import BranchSelector from "./views/branchSelector";
import Admin from "./views/admin/admin";
import ErrorPage from "./views/errorPage";
import { Branch } from "./types";
const socket = socketIOClient("http://localhost:2238");

interface AppContext {
  loading: boolean;
  socket: Socket;
  branches: Branch[];
  setLoading: (loading: boolean) => void;
  setBranches: (branches: Branch[]) => void;
}
export const context: React.Context<AppContext> = createContext<AppContext>({
  loading: true,
  socket: socket,
  branches: [],
  setLoading: () => {},
  setBranches: () => {},
});

const App = () => {
  const [loading, setLoading] = useState(true);
  const [branches, setBranches] = useState<Branch[]>([]);

  const contextValue: AppContext = {
    loading,
    socket,
    branches,
    setLoading: setLoading,
    setBranches: setBranches,
  };
  return (
    <context.Provider value={contextValue}>
      <Loader>
        <Routes>
          <Route path="/branches" element={<BranchSelector branches={branches} />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Loader>
    </context.Provider>
  );
};
export default App;
