import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Header, Sidebar } from "./components";

const App: React.FC = () => {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default App;
