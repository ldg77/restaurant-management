import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Menu() {
  const [status, setStatus] = useState({});
  useEffect(() => {
    fetch("http://localhost:4000/users/checklogin", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => setStatus(json));
  }, []);
  return (
    <div className="sm:min-h-max h-full">
      {(status.aprooved && status.isAdmin && (
        <ul className="flex flex-col gap-5 text-2xl group p-5 bg-slate-900 text-white h-full">
          <li className="bg-slate-600 p-3 rounded hover:bg-slate-800 hover:cursor-pointer hover:translate-x-1 transition">
            <NavLink to="dashboard" className="block">
              DASHBOARD
            </NavLink>
          </li>
          <li className="bg-slate-600 p-3 rounded hover:bg-slate-800 hover:cursor-pointer hover:translate-x-1 transition">
            <NavLink to="user" className="block">
              USER
            </NavLink>
          </li>
          <li className="bg-slate-600 p-3 rounded hover:bg-slate-800 hover:cursor-pointer hover:translate-x-1 transition">
            <NavLink to="group" className="block">
              GROUP
            </NavLink>
          </li>
          <li className="bg-slate-600 p-3 rounded hover:bg-slate-800 hover:cursor-pointer hover:translate-x-1 transition">
            <NavLink to="product" className="block">
              PRODUCT
            </NavLink>
          </li>
          <li className="bg-slate-600 p-3 rounded hover:bg-slate-800 hover:cursor-pointer hover:translate-x-1 transition">
            <NavLink to="restaurant" className="block">
              RESTAURANT
            </NavLink>
          </li>
          <li className="bg-slate-600 p-3 rounded hover:bg-slate-800 hover:cursor-pointer hover:translate-x-1 transition">
            <NavLink to="table" className="block">
              TABLE
            </NavLink>
          </li>
          <li className="bg-slate-600 p-3 rounded hover:bg-slate-800 hover:cursor-pointer hover:translate-x-1 transition">
            <NavLink to="password" className="block">
              PASSWORD
            </NavLink>
          </li>
          <li className="bg-slate-600 p-3 rounded hover:bg-slate-800 hover:cursor-pointer hover:translate-x-1 transition">
            <NavLink to="/" className="block">
              EXIT
            </NavLink>
          </li>
        </ul>
      )) ||
        (status.aprooved && (
          <ul className="flex flex-col gap-5 text-2xl group p-5 bg-slate-900 text-white h-full">
            <li className="bg-slate-600 p-3 rounded hover:bg-slate-800 hover:cursor-pointer">
              <NavLink to="password" className="block">
                PASSWORD
              </NavLink>
            </li>
            <li className="bg-slate-600 p-3 rounded hover:bg-slate-800 hover:cursor-pointer hover:translate-x-1 transition">
              <NavLink to="/" className="block">
                EXIT
              </NavLink>
            </li>
          </ul>
        ))}
    </div>
  );
}
