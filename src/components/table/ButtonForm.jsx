import React, { useState } from "react";
import RegisterForm from "../RegisterForm.jsx";
export default function ButtonForm({
  fields,
  setTrigger,
  submit,
  method,
  bg,
  left,
  id,
  path,
  user,
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <button
        className={`${bg} text-white p-3 ${left ? "rounded-l-lg" : "rounded"}`}
        onClick={() => {
          setShow((prev) => (prev = !prev));
        }}
      >
        {submit}
      </button>
      {show && (
        <RegisterForm
          position={"absolute"}
          setShow={setShow}
          setTrigger={setTrigger}
          submit={submit}
          fields={fields}
          method={method}
          left={left}
          id={id}
          path={path}
          user={user}
        />
      )}
    </div>
  );
}
