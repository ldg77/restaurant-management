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
    fetch("/groups")
      .then((res) => res.json())
      .then((json) => setGroups((prev) => (prev = json)));
  }, [trigger]);

  const handleDelete = (id) => {
    fetch("/groups/" + id, {
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
        <p className="font-sans text-2xl">
          Manage groups
          <p className="font-thin">admin|staff|guest</p>
        </p>
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
      <table className="text-center flex flex-col">
        {groups && (
          <>
            <thead className="flex w-full">
              <tr className="bg-slate-700 text-white uppercase w-full flex justify-between rounded px-5">
                <th className="w-1/2">name</th>
                <th className="w-1/2">action</th>
              </tr>
            </thead>
            <tbody className="flex flex-col w-full">
              {groups.map((el) => (
                <tr
                  className="bg-slate-500 text-white px-3 flex justify-between items-center my-2 rounded-t"
                  key={el._id}
                >
                  {<td className="w-1/2">{el.name}</td>}

                  {
                    <td className="flex justify-center py-5 mr-3 w-1/2">
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
