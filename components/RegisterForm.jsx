import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ErrorPage from "./ErrorPage.jsx";
export default function RegisterForm({
  position,
  setShow,
  submit,
  fields,
  left,
  method,
  id,
  setTrigger,
  path,
  role,
  user,
}) {
  const INITIAL = {};
  const navigator = useNavigate();
  const [data, setData] = useState(INITIAL);
  const [roleList, setRoleList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [showError, setSchowError] = useState({ show: false, message: "" });
  useEffect(() => {
    if (role) {
      fetch("/groups")
        .then((response) => response.json())
        .then((json) => {
          setRoleList((prev) => (prev = json));
          setData((prev) => (prev = { ...prev, role: json[0]._id }));
        });
    }
    if (user) {
      fetch("/users")
        .then((response) => response.json())
        .then((json) => {
          setUserList((prev) => (prev = json));
          setData(
            (prev) =>
              (prev = { ...prev, user: user === true ? json[0]._id : user })
          );
        });
    }
  }, []);

  const handleChange = (e) => {
    setData((prev) => (prev = { ...prev, [e.target.name]: e.target.value }));
  };

  const handlePOST = () => {
    if (submit === "register" && !data.password === data.repeatPassword) return;

    fetch(`/${path}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.approved) {
          console.log(json);
          if (submit === "register") {
            navigator("/");
          } else if (submit === "login") {
            navigator("/auth");
          }
          setData(INITIAL);
          setShow(false);
          setTrigger((prev) => (prev = !prev));
        } else {
          setSchowError(
            (prev) => (prev = { show: true, message: json.message })
          );
          setTimeout(() => {
            setSchowError((prev) => (prev = { show: false, message: "" }));
          }, 1000);
        }
      });
  };
  const handlePATCH = (id) => {
    fetch(`/${path}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.approved) {
          setData(INITIAL);
          setShow(false);
          setTrigger((prev) => (prev = !prev));
        } else {
          setSchowError(
            (prev) => (prev = { show: true, message: json.message })
          );
          setTimeout(() => {
            setSchowError((prev) => (prev = { show: false, message: "" }));
          }, 1000);
        }
      });
  };
  const now = new Date().toISOString().slice(0, -8);
  const handleSubmit = (e) => {
    e.preventDefault();
    switch (method) {
      case "POST":
        return handlePOST();
      case "PATCH":
        return handlePATCH(id);
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
        <div className="flex justify-between items-center gap-3">
          <label className="text-black">{el}</label>
          <input
            key={el._id}
            type={fields[el]}
            name={el}
            className="border-b-2 outline-none active::bg-inherit text-black"
            onChange={handleChange}
            value={data[el]}
            min={now}
            required
          />
        </div>
      ))}
      {role && (
        <select
          name="role"
          placeholder="role"
          onChange={handleChange}
          className="text-black p-2"
        >
          {roleList.map((el) => (
            <option value={el._id} key={el._id} className="p-3">
              {el.name}
            </option>
          ))}
        </select>
      )}
      {user === true && (
        <select
          name="user"
          placeholder="user"
          onChange={handleChange}
          className="text-black p-2"
        >
          {userList.map((el) => (
            <option value={el._id} key={el._id} className="p-3">
              {el.name}
            </option>
          ))}
        </select>
      )}
      <button className="bg-slate-700 text-white w-max px-3 py-2 rounded-xl mx-auto hover:bg-slate-900">
        {submit}
      </button>
      {showError.show && <ErrorPage message={showError.message} />}
    </form>
  );
}
