import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterForm({
  position,
  setShow,
  submit,
  fields,
  left,
  method,
}) {
  const changeForm = (arr) =>
    arr.reduce((acc, el) => {
      acc[el] = "";
      return acc;
    }, {});

  const INITIAL = {
    name: "",
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
    role: "",
  };
  const navigator = useNavigate();
  const [data, setData] = useState(changeForm(Object.keys(fields)));
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

  const handlePOST = () => {
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
          if (submit === "register") {
            navigator("/");
          }
          setData(INITIAL);
          setShow((prev) => (prev = { ...prev, showAdd: !prev.showAdd }));
        });
    }
  };
  const handlePATCH = () => {
    fetch("http://localhost:4000/users", {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (submit === "register") {
          navigator("/");
        }
        setData(INITIAL);
        setShow((prev) => (prev = { ...prev, showAdd: !prev.showAdd }));
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    switch (method) {
      case "POST":
        return handlePOST();

      default:
        break;
    }
  };
  return (
    <form
      className={`border p-5 flex flex-col gap-3 shadow-2xl rounded-lg ${position} ${left} z-10 bg-white`}
      onSubmit={handleSubmit}
    >
      {Object.keys(fields).map((el) => (
        <input
          type={fields[el]}
          name={el}
          placeholder={el}
          className="border-b-2 outline-none active::bg-inherit"
          onChange={handleChange}
          value={data[el]}
        />
      ))}
      <select name="role" placeholder="role" onChange={handleChange}>
        {roleList.map((el) => (
          <option value={el._id} key={el._id}>
            {el.name}
          </option>
        ))}
      </select>
      <button className="bg-slate-700 text-white w-max px-3 py-2 rounded-xl mx-auto hover:bg-slate-900">
        {submit}
      </button>
    </form>
  );
}
