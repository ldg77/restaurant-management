import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import SearchForm from "../SearchForm.jsx";
import ButtonForm from "./ButtonForm.jsx";
import { useOutletContext } from "react-router-dom";
import TableRow from "./TableRow.jsx";
export default function Table() {
  const user = useOutletContext();
  const [tables, setTables] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const fields = {
    add: {
      name: "text",
      capacity: "number",
    },
    edit: {
      bookedFrom: "datetime-local",
      bookedTill: "datetime-local",
    },
  };
  useEffect(() => {
    fetch("http://localhost:4000/tables")
      .then((res) => res.json())
      .then((json) => setTables((prev) => (prev = json)));
  }, [trigger]);

  const handleDelete = (id) => {
    fetch("http://localhost:4000/tables/" + id, {
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
        <p className="font-sans text-2xl">Manage tables</p>
        {user.isAdmin && <NavLink to="/auth/dashboard">Dashboard</NavLink>}
      </div>
      <div className="add flex justify-between items-center">
        {user.isAdmin && (
          <ButtonForm
            setTrigger={setTrigger}
            fields={fields.add}
            submit="Add Table"
            bg="bg-blue-800"
            method="POST"
            path="tables"
          />
        )}
        <SearchForm what={"tables"} setData={setTables} on={"name"} />
      </div>
      <table className="text-center">
        {tables && (
          <>
            <thead className="w-screen">
              <tr className="bg-slate-700 text-white uppercase justify-between w-full">
                <th>name</th>
                <th>capacity</th>
                <th>available</th>
                <th>bookedFrom</th>
                <th>bookedTill</th>
                <th>bookedFor</th>
                <th className="text-right">action</th>
              </tr>
            </thead>
            <tbody>
              {tables.map((el) =>
                !user.isAdmin ? (
                  (el.user?.name === user.name || !el.user) && (
                    <TableRow
                      el={el}
                      fields={fields}
                      setTrigger={setTrigger}
                      handleDelete={handleDelete}
                      user={user}
                    />
                  )
                ) : (
                  <TableRow
                    el={el}
                    fields={fields}
                    setTrigger={setTrigger}
                    handleDelete={handleDelete}
                    user={user}
                  />
                )
              )}
            </tbody>
          </>
        )}
      </table>
    </div>
  );
}
