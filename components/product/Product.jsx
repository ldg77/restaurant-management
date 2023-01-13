import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import SearchForm from "../SearchForm.jsx";
import ButtonForm from "./ButtonForm.jsx";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const fields = {
    add: {
      name: "text",
      avatar: "file",
      price: "number",
      description: "textarea",
      category: "text",
    },
    edit: {
      name: "text",
      avatar: "file",
      price: "number",
      description: "textarea",
      category: "text",
      available: "checkbox",
    },
  };
  useEffect(() => {
    fetch("http://localhost:4000/products")
      .then((res) => res.json())
      .then((json) => setProducts((prev) => (prev = json)));
  }, [trigger]);

  const handleDelete = (id) => {
    fetch("http://localhost:4000/products/" + id, {
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
        <p className="font-sans text-2xl">Manage products</p>
        <NavLink to="/auth/dashboard">Dashboard</NavLink>
      </div>
      <div className="add flex justify-between items-center">
        <ButtonForm
          setTrigger={setTrigger}
          fields={fields.add}
          submit="Add product"
          bg="bg-blue-800"
          method="POST"
          path="products"
        />
        <SearchForm what={"products"} setData={setProducts} on={"name"} />
      </div>
      <table className="text-center">
        {products && (
          <>
            <thead className="w-screen">
              <tr className="bg-slate-700 text-white uppercase justify-between w-full">
                <th>avatar</th>
                <th>name</th>
                <th>price</th>
                <th>description</th>
                <th>category</th>
                <th>available</th>
                <th className="text-right">action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((el) => (
                <tr className="odd:bg-slate-500 odd:text-white" key={el._id}>
                  {
                    <td>
                      <img src={el.avatar} alt="avatar" />
                    </td>
                  }
                  {<td>{el.name}</td>}
                  {<td>{el.price}</td>}
                  {<td>{el.description}</td>}
                  {<td>{el.category}</td>}
                  {
                    <td>
                      <input type="checkbox" checked={el.name} />{" "}
                    </td>
                  }
                  {
                    <td className="flex justify-end ">
                      <ButtonForm
                        fields={fields.edit}
                        setTrigger={setTrigger}
                        submit="Edit"
                        method="PATCH"
                        bg="bg-yellow-400"
                        left="-left-60"
                        id={el._id}
                        path="products"
                      />
                      <button
                        className="bg-red-500 sm:p-3 text-white hover:bg-red-600 transition"
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
