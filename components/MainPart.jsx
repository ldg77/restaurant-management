import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Menu from "./Menu.jsx";
import NotAprooved from "./NotAprooved.jsx";

export default function MainPart() {
  const [status, setStatus] = useState({});
  useEffect(() => {
    fetch("http://localhost:4000/users/checklogin", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => setStatus(json));
  }, []);
  return status.aprooved ? (
    <div className="flex flex-col sm:flex-row h-full">
      <Menu status={status} />
      <Outlet />
    </div>
  ) : (
    <NotAprooved />
  );
}
