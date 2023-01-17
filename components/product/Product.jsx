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
    fetch("/products")
      .then((res) => res.json())
      .then((json) => setProducts((prev) => (prev = json)));
  }, [trigger]);

  const handleDelete = (id) => {
    fetch("/products/" + id, {
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
          submit="Add Product"
          bg={"bg-blue-800"}
          hoverBg={"bg-blue-900"}
          rounded={"rounded"}
        />
        <SearchForm what={"products"} setData={setProducts} on={"name"} />
      </div>
      <table className="text-center flex flex-col">
        {products && (
          <>
            <thead className="flex w-full">
              <tr className="bg-slate-700 text-white uppercase w-full flex justify-between rounded">
                <th className="w-1/5">avatar</th>
                <th className="w-1/5">name</th>
                <th className="w-1/5">price</th>
                <th className="w-1/5">description</th>
                <th className="w-1/5">category</th>
                <th className="w-1/5">available</th>
                <th className="text-right px-3">action</th>
              </tr>
            </thead>
            <tbody className="flex flex-col w-full">
              {products.map((el) => (
                <tr
                  className="bg-slate-500 text-white px-3 flex justify-between items-center my-2 rounded-t"
                  key={el._id}
                >
                  {
                    <td className="w-1/5">
                      <img
                        src={el.avatar}
                        alt="avatar"
                        className="w-20 h-20 rounded-full p-2"
                      />
                    </td>
                  }
                  {<td className="w-1/5">{el.name}</td>}
                  {<td className="w-1/5">{el.price}€</td>}
                  {<td className="w-1/5">{el.description}</td>}
                  {<td className="w-1/5">{el.category}</td>}
                  {
                    <td className="w-1/5">
                      <input type="checkbox" checked={el.available} />{" "}
                    </td>
                  }
                  {
                    <td className="flex">
                      <ButtonForm
                        setTrigger={setTrigger}
                        id={el._id}
                        submit="Edit"
                        bg={"bg-yellow-400"}
                        left={"right-0"}
                        hoverBg={"bg-yellow-900"}
                        rounded={"rounded-l-lg"}
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
