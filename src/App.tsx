import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Home 3</div>} />
      {/* <Route path="/products" element={<Products />} /> */}
      {/* <Route path="/about" element={<About />} /> */}
    </Routes>
  );
}

export default App;
