import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Restaurant() {
  const [edit, setEdit] = useState(false);
  const [restaurantData, setRestaurantData] = useState({
    name: "",
    address: {},
    contact: {},
  });

  useEffect(() => {
    fetch("/restaurants")
      .then((res) => res.json())
      .then((json) => {
        json.length ? setRestaurantData(json[0]) : setEdit(true);
      });
  }, []);

  const handleChange = (e) => {
    setRestaurantData((prev) => (prev = { ...prev, name: e.target.value }));
  };
  const handleChangeAddress = (e) => {
    setRestaurantData(
      (prev) =>
        (prev = {
          ...prev,
          address: { ...prev.address, [e.target.name]: e.target.value },
        })
    );
  };
  const handleChangeContact = (e) => {
    setRestaurantData(
      (prev) =>
        (prev = {
          ...prev,
          contact: { ...prev.contact, [e.target.name]: e.target.value },
        })
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/restaurants", {
      method: "POST",
      body: JSON.stringify(restaurantData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => setEdit(false));
  };

  return (
    <div className="p-5 text-center">
      <div className="top flex justify-between">
        <p className="font-sans text-2xl">Manage Restaurantinfo</p>
        <NavLink to="/auth/dashboard">Dashboard</NavLink>
      </div>
      <h1 className="text-2xl">Information about your Restaurant</h1>
      <form
        className="flex flex-col gap-5 justify-center items-center p-5 "
        onSubmit={handleSubmit}
      >
        <label className="grid grid-cols-2 justify-center items-center">
          Restaurantname:
          <input
            type="text"
            name="name"
            readOnly={!edit}
            className="p-3 outline-none text-center"
            placeholder="restaurantName"
            onChange={handleChange}
            value={restaurantData.name}
          />
        </label>
        <div className="flex flex-col sm:flex-row gap-10">
          <div className="grid shadow-xl rounded-xl p-5">
            <h1 className="font-thin">Address</h1>
            <label className="grid grid-cols-2 justify-between items-center">
              Street:
              <input
                type="text"
                name="street"
                readOnly={!edit}
                className="p-3 outline-none"
                placeholder="street"
                onChange={handleChangeAddress}
                value={restaurantData.address?.street}
              />
            </label>
            <label className="grid grid-cols-2 justify-between items-center">
              Streetnumber:
              <input
                type="text"
                name="streetnumber"
                readOnly={!edit}
                className="p-3 outline-none"
                placeholder="streetnumber"
                onChange={handleChangeAddress}
                value={restaurantData.address?.streetnumber}
              />
            </label>
            <label className="grid grid-cols-2 justify-between items-center">
              Zip Code:
              <input
                type="text"
                name="zip"
                readOnly={!edit}
                className="p-3 outline-none"
                placeholder="zip"
                onChange={handleChangeAddress}
                value={restaurantData.address?.zip}
              />
            </label>
            <label className="grid grid-cols-2 justify-between items-center">
              City:
              <input
                type="text"
                name="city"
                readOnly={!edit}
                className="p-3 outline-none"
                placeholder="city"
                onChange={handleChangeAddress}
                value={restaurantData.address?.city}
              />
            </label>
            <label className="grid grid-cols-2 justify-between items-center">
              Country:
              <input
                type="text"
                name="country"
                readOnly={!edit}
                className="p-3 outline-none"
                placeholder="country"
                onChange={handleChangeAddress}
                value={restaurantData.address?.country}
              />
            </label>
          </div>
          <div className="flex flex-col shadow-xl rounded-xl p-5">
            <h1 className="font-thin">Contact</h1>
            <label className="grid grid-cols-2 justify-between items-center">
              Phone:
              <input
                type="tel"
                name="phone"
                readOnly={!edit}
                className="p-3 outline-none"
                placeholder="phone"
                onChange={handleChangeContact}
                value={restaurantData.contact?.phone}
              />
            </label>
            <label className="grid grid-cols-2 justify-between items-center">
              Telephone:
              <input
                type="tel"
                name="fax"
                readOnly={!edit}
                className="p-3 outline-none"
                placeholder="fax"
                onChange={handleChangeContact}
                value={restaurantData.contact?.fax}
              />
            </label>
            <label className="grid grid-cols-2 justify-between items-center">
              Email:
              <input
                type="email"
                name="email"
                readOnly={!edit}
                className="p-3 outline-none"
                placeholder="email"
                onChange={handleChangeContact}
                value={restaurantData.contact?.email}
              />
            </label>
            <label className="grid grid-cols-2 justify-between items-center">
              Homepage:
              <input
                type="text"
                name="homepage"
                readOnly={!edit}
                className="p-3 outline-none"
                placeholder="homepage"
                onChange={handleChangeContact}
                value={restaurantData.contact?.homepage}
              />
            </label>
          </div>
        </div>
        <button
          className={`bg-blue-900 text-white rounded-xl ${edit && "px-5 py-3"}`}
        >
          {edit && "Save"}
        </button>
      </form>
      <button
        onClick={() => setEdit(true)}
        className={`bg-yellow-400 text-white ${
          !edit && "px-5 py-3"
        } rounded-xl `}
      >
        {!edit && "Edit"}
      </button>
    </div>
  );
}
