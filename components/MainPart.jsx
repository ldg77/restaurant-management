import React from "react";
import { Outlet } from "react-router-dom";
import Menu from "./Menu.jsx";

export default function MainPart() {
  return (
    <div className="flex h-full">
      <Menu />
      <Outlet />
    </div>
  );
}
