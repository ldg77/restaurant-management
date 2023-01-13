import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
  const INITIAL = {
    username: "",
    password: "",
  };
  const fields = {
    username: "text",
    password: "password",
  };
  const navigator = useNavigate();
  const [data, setData] = useState(INITIAL);
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    setData((prev) => (prev = { ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/users/login", {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setData(INITIAL);
        if (json.message) {
          console.log(json);
          navigator("/auth");
        } else {
          setShow(true);
          setTimeout(() => {
            setShow(false);
          }, 2000);
        }
      });
  };
  return (
    <div className="grid place-content-center h-screen">
      <form
        className="border p-5 flex flex-col gap-3 shadow-2xl rounded-lg"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between items-center gap-3">
          <label>username</label>
          <input
            type="text"
            name="username"
            className="border-b-2 outline-none active::bg-inherit"
            onChange={handleChange}
            value={data.username}
          />
        </div>
        <div className="flex justify-between items-center gap-3">
          <label>password</label>
          <input
            type="password"
            name="password"
            className="border-b-2 outline-none bg-inherit"
            onChange={handleChange}
            value={data.password}
          />
        </div>
        <button className="bg-slate-700 text-white w-max px-3 py-2 rounded-xl mx-auto hover:bg-slate-900">
          login
        </button>
      </form>
      <div className="font-thin text-center font-sans relative mt-3">
        need an account?{" "}
        <Link to="/register" className="font-bold">
          register
        </Link>
        {show && (
          <p className="absolute bg-slate-700 text-red-300 inset-0 rounded">
            wrong login data
          </p>
        )}
      </div>
    </div>
  );
}
