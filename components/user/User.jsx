import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import RegisterForm from "../RegisterForm.jsx";
import SearchForm from "../SearchForm.jsx";

export default function User() {
  const [users, setUsers] = useState();
  const [show, setShow] = useState({ showAdd: false, modified: false });
  useEffect(() => {
    fetch("http://localhost:4000/users")
      .then((res) => res.json())
      .then((json) => setUsers((prev) => (prev = json)));
  }, [show]);

  const handleEdit = () => {};
  const handleDelete = (id) => {
    fetch("http://localhost:4000/users/" + id, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((json) =>
        setShow((prev) => (prev = { ...prev, modified: !prev.modified }))
      );
  };

  return (
    <div className="w-full sm:p-5 flex flex-col gap-5">
      <div className="top flex justify-between">
        <p className="font-sans text-2xl">Manage users</p>
        <NavLink to="dashboard">Dashboard</NavLink>
      </div>
      <div className="add flex justify-between items-center">
        <div className="relative">
          <button
            className="bg-blue-800 text-white p-3 rounded"
            onClick={() => {
              setShow((prev) => (prev = { ...prev, showAdd: !prev.showAdd }));
            }}
          >
            Add User
          </button>
          {show.showAdd && (
            <RegisterForm
              position={"absolute"}
              setShow={setShow}
              submit={"add"}
            />
          )}
        </div>
        <SearchForm what={"Users"} />
      </div>
      <table className="text-center">
        {users && (
          <>
            <thead>
              <tr className="bg-slate-700 text-white uppercase">
                <th>name</th>
                <th>username</th>
                <th className="">email</th>
                <th>role</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((el) => (
                <tr className="odd:bg-slate-500 odd:text-white" key={el._id}>
                  {<td>{el.name}</td>}
                  {<td>{el.username}</td>}
                  {<td>{el.email}</td>}
                  {<td>{el.role.name}</td>}
                  {
                    <td className="flex justify-end">
                      <div className="edit">
                        <button className="bg-yellow-300 sm:p-3 text-white hover:bg-yellow-400 transition">
                          Edit
                        </button>
                      </div>
                      <button
                        className="bg-red-500 sm:p-3 text-white hover:bg-red-600 transition"
                        onClick={() => {
                          handleDelete(el._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  }
                </tr>
              ))}
            </tbody>
          </>
        )}
      </table>
    </div>
  );
}
