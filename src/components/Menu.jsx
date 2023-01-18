import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Menu({ status }) {
  const handleĹogout = () => {
    fetch("/users/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  };
  return (
    <div className="sm:min-h-max sm:h-full">
      {status.aprooved && (
        <ul className="flex flex-col gap-5 text-2xl group p-5 bg-slate-900 text-white h-full">
          {status.isAdmin && (
            <li className="bg-slate-600 p-3 rounded hover:bg-slate-800 hover:cursor-pointer hover:translate-x-1 transition">
              <NavLink to="dashboard" className="block">
                DASHBOARD
              </NavLink>
            </li>
          )}
          {status.isAdmin && (
            <li className="bg-slate-600 p-3 rounded hover:bg-slate-800 hover:cursor-pointer hover:translate-x-1 transition">
              <NavLink to="user" className="block">
                USER
              </NavLink>
            </li>
          )}
          {status.isAdmin && (
            <li className="bg-slate-600 p-3 rounded hover:bg-slate-800 hover:cursor-pointer hover:translate-x-1 transition">
              <NavLink to="group" className="block">
                GROUP
              </NavLink>
            </li>
          )}
          {status.isAdmin && (
            <li className="bg-slate-600 p-3 rounded hover:bg-slate-800 hover:cursor-pointer hover:translate-x-1 transition">
              <NavLink to="product" className="block">
                PRODUCT
              </NavLink>
            </li>
          )}
          {status.isAdmin && (
            <li className="bg-slate-600 p-3 rounded hover:bg-slate-800 hover:cursor-pointer hover:translate-x-1 transition">
              <NavLink to="restaurant" className="block">
                RESTAURANT
              </NavLink>
            </li>
          )}
          <li className="bg-slate-600 p-3 rounded hover:bg-slate-800 hover:cursor-pointer hover:translate-x-1 transition">
            <NavLink to="table" className="block">
              TABLE
            </NavLink>
          </li>

          <li className="bg-slate-600 p-3 rounded hover:bg-slate-800 hover:cursor-pointer hover:translate-x-1 transition">
            <NavLink to="/" className="block" onClick={handleĹogout}>
              EXIT
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
}
