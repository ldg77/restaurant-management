import { useState, useEffect } from "react";

export default function RegisterForm({ position, setShow, submit }) {
  const INITIAL = {
    name: "",
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
    role: "",
  };
  const [data, setData] = useState(INITIAL);
  const [roleList, setRoleList] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/groups")
      .then((response) => response.json())
      .then((json) => {
        setRoleList((prev) => (prev = json));
        setData((prev) => (prev = { ...prev, role: json[0]._id }));
      });
  }, []);

  const handleChange = (e) => {
    setData((prev) => (prev = { ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.password === data.repeatPassword) {
      fetch("http://localhost:4000/users", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          setData(INITIAL);
          setShow((prev) => (prev = { ...prev, showAdd: !prev.showAdd }));
        });
    }
  };
  return (
    <form
      className={`border p-5 flex flex-col gap-3 shadow-2xl rounded-lg ${position} z-10 bg-white`}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        placeholder="name"
        className="border-b-2 outline-none active::bg-inherit"
        onChange={handleChange}
        value={data.name}
      />
      <input
        type="text"
        name="username"
        placeholder="username"
        className="border-b-2 outline-none active::bg-inherit"
        onChange={handleChange}
        value={data.username}
      />
      <input
        type="email"
        name="email"
        placeholder="email"
        className="border-b-2 outline-none active::bg-inherit"
        onChange={handleChange}
        value={data.email}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        className="border-b-2 outline-none bg-inherit"
        onChange={handleChange}
        value={data.password}
      />
      <input
        type="password"
        name="repeatPassword"
        placeholder="repeatPassword"
        className="border-b-2 outline-none bg-inherit"
        onChange={handleChange}
        value={data.repeatPassword}
      />
      <select name="role" placeholder="role" onChange={handleChange}>
        {roleList.map((el) => (
          <option value={el._id}>{el.name}</option>
        ))}
      </select>
      <button className="bg-slate-700 text-white w-max px-3 py-2 rounded-xl mx-auto hover:bg-slate-900">
        {submit}
      </button>
    </form>
  );
}
