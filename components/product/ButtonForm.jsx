import React, { useState } from "react";
import { ImFilePicture } from "react-icons/im";
export default function ButtonForm({
  id,
  setTrigger,
  submit,
  bg,
  left,
  hoverBg,
  rounded,
}) {
  const INITIAL = {};
  const [show, setShow] = useState(false);
  const [data, setData] = useState(INITIAL);
  const categoryList = ["main", "drinks", "salads", "desserts", "starters"];
  const handleChange = (e) => {
    setData((prev) => (prev = { ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(data).forEach((el) => formData.append(el, data[el]));
    fetch(`/products/${id ? id : ""}`, {
      method: !id ? "POST" : "PATCH",
      body: formData,
    })
      .then((response) => response.json())
      .then((json) => {
        setShow(false), setTrigger((prev) => (prev = !prev));
      });
  };

  return (
    <div className="relative">
      <button
        className={`${bg} text-white p-3 ${rounded} hover:${hoverBg} hover:shadow-2xl`}
        onClick={() => {
          setShow((prev) => (prev = !prev));
        }}
      >
        {submit}
      </button>
      {show && (
        <form
          className={`border p-5 flex flex-col gap-3 shadow-2xl  z-10 bg-white absolute ${left} text-black`}
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <label className="text-center self-center text-3xl hover:cursor-pointer text-blue-800">
            <ImFilePicture />
            <input
              type="file"
              name="avatar"
              className="border-b-2 outline-none active::bg-inherit text-black hidden"
              onChange={(e) =>
                setData(
                  (prev) => (prev = { ...prev, avatar: e.target.files[0] })
                )
              }
            />
          </label>
          <label className="flex gap-5">
            name
            <input
              type="text"
              name="name"
              className="border-b-2 outline-none active::bg-inherit text-black"
              onChange={handleChange}
              value={data.name}
            />
          </label>
          <label className="flex gap-5">
            price
            <input
              type="number"
              name="price"
              className="border-b-2 outline-none active::bg-inherit text-black"
              onChange={handleChange}
              value={data.price}
            />
          </label>
          <label className="flex justify-between gap-5">
            checkbox
            <input
              type="checkbox"
              name="available"
              className="border-b-2 outline-none active::bg-inherit text-black "
              onChange={(e) =>
                setData(
                  (prev) => (prev = { ...prev, available: e.target.checked })
                )
              }
              value={data.available}
            />
          </label>

          <select
            name="category"
            onChange={handleChange}
            className="text-black py-2"
          >
            {categoryList.map((el) => (
              <option value={el} key={el} className="p-3">
                {el}
              </option>
            ))}
          </select>
          <textarea
            name="description"
            cols="30"
            rows="10"
            className="resize-none outline-none"
            placeholder="description"
            onChange={handleChange}
          />
          <button className="bg-blue-800 text-white p-3 w-1/2 mx-auto rounded hover:bg-blue-900 hover:shadow-2xl transition ">
            save
          </button>
        </form>
      )}
    </div>
  );
}
