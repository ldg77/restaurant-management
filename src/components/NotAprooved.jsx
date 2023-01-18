import React from "react";
import { Link } from "react-router-dom";

export default function NotAprooved() {
  return (
    <div className="grid place-content-center h-screen ">
      <div className="flex flex-col justify-center items-center text-2xl shadow-2xl p-5 rounded-xl divide-y-1">
        <p className="p-3">Dear guest</p>
        <p>please login first</p>
        <Link to="/">
          back to <strong className="underline">Login</strong>
        </Link>
      </div>
    </div>
  );
}
