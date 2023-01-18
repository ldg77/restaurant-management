import { Routes, Route } from "react-router-dom";
import MainPart from "./components/MainPart.jsx";
import User from "./components/user/User.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import Group from "./components/group/Group.jsx";
import Product from "./components/product/Product.jsx";
import Restaurant from "./components/restaurant/Restaurant.jsx";
import Table from "./components/table/Table.jsx";

function App() {
  return (
    <div className="App h-screen">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth" element={<MainPart />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="user" element={<User />} />
          <Route path="group" element={<Group />} />
          <Route path="product" element={<Product />} />
          <Route path="restaurant" element={<Restaurant />} />
          <Route path="table" element={<Table />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
