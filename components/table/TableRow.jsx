import ButtonForm from "./ButtonForm.jsx";

export default function TableRow({
  el,
  fields,
  setTrigger,
  handleDelete,
  user,
}) {
  const handleClear = () => {
    fetch("http://localhost:4000/tables/clear/" + el._id, {
      method: "PATCH",
      body: {},
    }).then((res) => {
      if (res.ok) {
        setTrigger((prev) => (prev = !prev));
      }
    });
  };
  return (
    <tr className="odd:bg-slate-500 odd:text-white" key={el._id}>
      {<td>{el.name}</td>}
      {<td>{el.capacity}</td>}
      {
        <td>
          <input type="checkbox" checked={el.available} readOnly />
        </td>
      }
      {<td>{el.bookedFrom?.slice(0, -8).split("T").join(" : ")}</td>}
      {<td>{el.bookedTill?.slice(0, -8).split("T").join(" : ")}</td>}
      {<td>{el.user?.name}</td>}

      {
        <td className="flex justify-end items-center py-5 mr-3">
          <ButtonForm
            fields={fields.edit}
            setTrigger={setTrigger}
            submit="Edit"
            method="PATCH"
            bg="bg-yellow-400"
            left={"right-0"}
            id={el._id}
            path="tables"
            user={user.isAdmin ? true : user._id}
          />
          <button
            className={`bg-green-500 sm:p-3 text-white hover:bg-green-600 transition ${
              !user.isAdmin && "rounded-r-lg"
            }`}
            onClick={handleClear}
          >
            Clear
          </button>
          {user.isAdmin && (
            <button
              className={`bg-red-500 sm:p-3 text-white hover:bg-red-600 transition rounded-r-lg`}
              onClick={() => {
                handleDelete(el._id);
              }}
            >
              Delete
            </button>
          )}
        </td>
      }
    </tr>
  );
}
