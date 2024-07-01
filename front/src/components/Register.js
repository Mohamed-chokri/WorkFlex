import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

function Register() {
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    const user = {
      email: value.email,
      password: value.password,
    };

    try {
      const response = await axios.post(
        "http://localhost:4040/api/auth/register",
        user
      );

      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        Cookies.set("token", response.data.token, { expires: 0.5 });
        navigate("/");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Error registering:", error);
      setError("Registration failed");
    }
  };

  return (
    <div className="loginpage">
      <div className="loginform">
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
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
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
