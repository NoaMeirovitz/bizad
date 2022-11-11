import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleRequest } from "../services/http";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const navigate = useNavigate();

  async function submit() {
    if (password !== repeatPassword) {
      alert("Passwords do not match");
      return;
    }
    const newUser = {
      name,
      email,
      password,
    };

    const response = await handleRequest("auth/signup", newUser);
    if (response.status === 200 || response.status === 201) {
      const data = await response.json();
      navigate("/login");
    }
  }

  return (
    <div className="p-3 form-max-w m-auto">
      <h1>Sign up</h1>
      <div className="mb-3">
        <input
          className="form-control"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          type="password"
          placeholder="Repeat Password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
      </div>

      <button onClick={submit} className="btn btn-primary btn-lg w-100">
        Sign Up
      </button>
      <Link to="/login">Go to login</Link>
    </div>
  );
}

export default SignUp;
