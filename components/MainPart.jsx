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
      .then((json) => setStatus((prev) => (prev = json)));
  }, []);
  return status.aprooved ? (
    <div className="flex flex-col sm:flex-row h-full">
      <Menu status={status} />
      <div className="auth w-full">
        <div className="flex w-full justify-between">
          <p className="p-5 text-2xl ">
            {" "}
            You are authorized, {status.user.name}
          </p>
          <p className="p-5 text-2xl">
            <strong className="font-bold">Admin:</strong>{" "}
            {status.isAdmin ? "true" : "false"}
          </p>
        </div>

        {!status.user.isAdmin && (
          <p className="font-thin">
            {" "}
            To use all functionality , you must be Admin
          </p>
        )}
        <Outlet context={status.user} />
      </div>
    </div>
  ) : (
    <NotAprooved />
  );
}
