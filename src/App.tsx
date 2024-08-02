import { Outlet } from "react-router-dom";
import "./App.css";
import { Header, Sidebar } from "./components";

function App() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex ">
        <Sidebar />
        <Outlet />
      </div>

      {/* <Footer /> */}
    </div>
  );
}

export default App;
