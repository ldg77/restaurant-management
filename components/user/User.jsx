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
        <NavLink to="/auth/dashboard">Dashboard</NavLink>
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
      <table className="text-center flex flex-col ">
        {users && (
          <>
            <thead className="flex w-full">
              <tr className="bg-slate-700 text-white uppercase w-full flex justify-between rounded px-5">
                <th className="w-1/5">name</th>
                <th className="w-1/5">username</th>
                <th className="w-1/5">email</th>
                <th className="w-1/5">role</th>
                <th className="w-1/5">action</th>
              </tr>
            </thead>
            <tbody className="flex flex-col w-full">
              {users.map((el) => (
                <>
                  <tr
                    className="bg-slate-500 text-white px-3 flex justify-between items-center my-2 rounded-t"
                    key={el._id}
                  >
                    {<td className="w-1/5">{el.name}</td>}
                    {<td className="w-1/5">{el.username}</td>}
                    {<td className="w-1/5">{el.email}</td>}
                    {<td className="w-1/5">{el.role.name}</td>}
                    {
                      <td className="flex justify-end py-5 mr-3 w-1/5">
                        <ButtonForm
                          fields={fields.edit}
                          setTrigger={setTrigger}
                          submit="Edit"
                          method="PATCH"
                          bg="bg-yellow-400"
                          left={"right-0"}
                          id={el._id}
                          path="users"
                          role={true}
                        />
                        <button
                          className="bg-red-500 sm:p-3 text-white hover:bg-red-600 transition rounded-r-lg"
                          onClick={() => {
                            handleDelete(el._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    }
                  </tr>

                  {el.bookedTable.length ? (
                    <tr className="bg-slate-700 text-white uppercase flex justify-between items-center px-5 text-end w-2/3 rounded-t">
                      <th className="w-1/5">table</th>
                      <th className="w-2/5">from</th>
                      <th className="w-2/5">till</th>
                    </tr>
                  ) : null}
                  {el.bookedTable.map((table) => (
                    <tr className="bg-slate-500 text-white uppercase flex justify-between items-center px-5 text-end w-2/3 ">
                      <td className="w-1/5">{table.name}</td>
                      <td className="w-2/5">
                        {" "}
                        {table.bookedFrom?.slice(0, -8).split("T").join(" : ")}
                      </td>
                      <td className="w-2/5">
                        {table.bookedTill?.slice(0, -8).split("T").join(" : ")}
                      </td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </>
        )}
      </table>
    </div>
  );
}
