import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
function Login() {
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = {
      email: value.email,
      password: value.password,
    };

    try {
      const response = await axios.post(
        "http://localhost:4040/api/auth/login",
        user
      );
      if (response.data.LoginStatus) {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } else {
        setError(response.data.error);
      }

      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
      setError("wrong email or password");
    }
  };

  return (
    <div className="loginpage">
      <div className="loginform">
        <h1>Login page</h1>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="email">
              <strong>Email:</strong>
            </label>
            <br />
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              className="form_control"
              autoComplete="off"
              onChange={(e) => setValue({ ...value, email: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="password">
              <strong>Password:</strong>
            </label>
            <br />
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              className="form_control"
              onChange={(e) => setValue({ ...value, password: e.target.value })}
            />
          </div>
          <div className="errormsg">{error && error}</div>
          <button className="btn-control" type="submit">
            Login
          </button>
        </form>
        <button className="btn-control" onClick={()=> navigate("/register")}>
            registre
          </button>
      </div>
    </div>
  );
}

export default Login;
