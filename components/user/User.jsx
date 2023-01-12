import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import SearchForm from "../SearchForm.jsx";

export default function User() {
  const [users, setUsers] = useState();
  useEffect(() => {
    fetch("http://localhost:4000/users")
      .then((res) => res.json())
      .then((json) => setUsers((prev) => (prev = json)));
  }, []);

  return (
    <div className="w-full p-5 flex flex-col gap-5">
      <div className="top flex justify-between">
        <p className="font-sans text-2xl">Manage users</p>
        <NavLink to="dashboard">Dashboard</NavLink>
      </div>
      <div className="add flex justify-between items-center">
        <button className="bg-blue-800 text-white p-3 rounded">Add User</button>
        <SearchForm what={"Users"} />
      </div>
      <table>
        {users && (
          <>
            <tr>
              <th>name</th>
              <th>username</th>
              <th>email</th>
              <th>role</th>
              <th>action</th>
            </tr>
            <tr></tr>
          </>
        )}
      </table>
    </div>
  );
}
