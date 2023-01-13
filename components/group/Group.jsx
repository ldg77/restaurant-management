import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import SearchForm from "../SearchForm.jsx";
import ButtonForm from "./ButtonForm.jsx";

export default function Group() {
  const [groups, setGroups] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const fields = {
    add: {
      name: "text",
    },
    edit: {
      name: "text",
    },
  };
  useEffect(() => {
    fetch("http://localhost:4000/groups")
      .then((res) => res.json())
      .then((json) => setGroups((prev) => (prev = json)));
  }, [trigger]);

  const handleDelete = (id) => {
    fetch("http://localhost:4000/groups/" + id, {
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
        <p className="font-sans text-2xl">Manage groups</p>
        <NavLink to="/auth/dashboard">Dashboard</NavLink>
      </div>
      <div className="add flex justify-between items-center">
        <ButtonForm
          setTrigger={setTrigger}
          fields={fields.add}
          submit="Add Group"
          bg="bg-blue-800"
          method="POST"
          path="groups"
        />
        <SearchForm what={"groups"} setData={setGroups} on={"name"} />
      </div>
      <table className="text-center">
        {groups && (
          <>
            <thead className="w-screen">
              <tr className="bg-slate-700 text-white uppercase justify-between w-full">
                <th>name</th>
                <th className="text-right">action</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((el) => (
                <tr className="odd:bg-slate-500 odd:text-white" key={el._id}>
                  {<td>{el.name}</td>}

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
                        path="groups"
                      />
                      <button
                        className="bg-red-500 sm:p-3 text-white hover:bg-red-600 transition rounded-r-lg"
                        onClick={() => {
                          if (groups.length > 1) {
                            handleDelete(el._id);
                          }
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
