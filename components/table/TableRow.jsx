import ButtonForm from "./ButtonForm.jsx";

export default function TableRow({ el, fields, setTrigger }) {
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
            user={true}
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
  );
}
