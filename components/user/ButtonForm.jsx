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
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <button
        className={`${bg} text-white p-3 rounded`}
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
        />
      )}
    </div>
  );
}
