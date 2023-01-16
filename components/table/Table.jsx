import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import SearchForm from "../SearchForm.jsx";
import ButtonForm from "./ButtonForm.jsx";
export default function Table() {
  const [tables, setTables] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const fields = {
    add: {
      name: "text",
      capacity: "number",
      bookedFrom: "datetime-local",
      bookedTill: "datetime-local",
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
        <NavLink to="/auth/dashboard">Dashboard</NavLink>
      </div>
      <div className="add flex justify-between items-center">
        <ButtonForm
          setTrigger={setTrigger}
          fields={fields.add}
          submit="Add Table"
          bg="bg-blue-800"
          method="POST"
          path="tables"
        />
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
                <th className="text-right">action</th>
              </tr>
            </thead>
            <tbody>
              {tables.map((el) => (
                <tr className="odd:bg-slate-500 odd:text-white" key={el._id}>
                  {<td>{el.name}</td>}
                  {<td>{el.capacity}</td>}
                  {
                    <td>
                      <input type="checkbox" checked={el.available} readOnly />
                    </td>
                  }
                  {<td>{el.bookedFrom}</td>}
                  {<td>{el.bookedTill}</td>}

                  {
                    <td className="flex justify-end py-5 mr-3">
                      <ButtonForm
                        fields={fields.edit}
                        setTrigger={setTrigger}
                        submit="Edit"
                        method="PATCH"
                        bg="bg-yellow-400"
                        left={"right-0"}
                        id={el._id}
                        path="tables"
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
              ))}
            </tbody>
          </>
        )}
      </table>
    </div>
  );
}
