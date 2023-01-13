import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import SearchForm from "../SearchForm.jsx";
import ButtonForm from "./ButtonForm.jsx";

export default function User() {
  const [users, setUsers] = useState([]);
  const [trigger, setTrigger] = useState(false);

  const fields = {
    add: {
      name: "text",
      username: "text",
      email: "email",
      password: "password",
      repeatPassword: "password",
    },
    edit: {
      name: "text",
      username: "text",
      email: "email",
    },
  };
  useEffect(() => {
    fetch("http://localhost:4000/users")
      .then((res) => res.json())
      .then((json) => setUsers((prev) => (prev = json)));
  }, [trigger]);

  const handleDelete = (id) => {
    fetch("http://localhost:4000/users/" + id, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((json) => setTrigger((prev) => (prev = !prev)));
  };
  return (
    <div className="w-full sm:p-5 flex flex-col gap-5">
      <div className="top flex justify-between">
        <p className="font-sans text-2xl">Manage users</p>
        <NavLink to="dashboard">Dashboard</NavLink>
      </div>
      <div className="add flex justify-between items-center ">
        <ButtonForm
          setTrigger={setTrigger}
          fields={fields.add}
          submit="Add User"
          bg="bg-blue-800"
          method="POST"
          path="users"
          role={true}
        />
        <SearchForm what={"users"} setData={setUsers} on={"name"} />
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
                      <ButtonForm
                        fields={fields.edit}
                        setTrigger={setTrigger}
                        submit="Edit"
                        method="PATCH"
                        bg="bg-yellow-400"
                        left="-left-60"
                        id={el._id}
                        path="users"
                      />
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
