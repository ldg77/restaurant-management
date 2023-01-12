import Menu from "../components/Menu.jsx";
import { Routes, Route } from "react-router-dom";
import MainPart from "../components/MainPart.jsx";
import User from "../components/user/User.jsx";
import Login from "../components/Login.jsx";
import Register from "../components/Register.jsx";

function App() {
  return (
    <div className="App h-screen">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth" element={<MainPart />}>
          <Route path="user" element={<User />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
