import RegisterForm from "../RegisterForm.jsx";
import { useState } from "react";
export default function UserButons({ id }) {
  const [show, setShow] = useState(false);
  const fields = {
    name: "text",
    username: "text",
    email: "email",
  };

  return (
    <div className="edit relative">
      <button
        className="bg-yellow-300 sm:p-3 text-white hover:bg-yellow-400 transition"
        onClick={() => {
          setShow(!show);
        }}
      >
        Edit
      </button>
      <div>
        {show && (
          <RegisterForm
            fields={fields}
            submit="Edit"
            position="absolute"
            left="-left-60"
            method="PATCH"
          />
        )}
      </div>
    </div>
  );
}
