import { Link, useNavigate } from "react-router-dom";
import RegisterForm from "./RegisterForm.jsx";
export default function Register() {
  return (
    <div className="grid place-content-center h-screen">
      <RegisterForm position={"relative"} submit={"register"} />
      <p className="font-thin text-center font-sans mt-3">
        have allready an account?{" "}
        <Link to="/" className="font-bold">
          login
        </Link>
      </p>
    </div>
  );
}
