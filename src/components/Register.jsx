import { Link } from "react-router-dom";
import RegisterForm from "./RegisterForm.jsx";
export default function Register() {
  const fields = {
    name: "text",
    username: "text",
    email: "email",
    password: "password",
    repeatPassword: "password",
  };
  return (
    <div className="grid place-content-center h-screen">
      <RegisterForm
        position={"relative"}
        submit={"register"}
        fields={fields}
        method="POST"
        path="users"
        role={true}
      />
      <p className="font-thin text-center font-sans mt-3">
        have allready an account?{" "}
        <Link to="/" className="font-bold">
          login
        </Link>
      </p>
    </div>
  );
}
