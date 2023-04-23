import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
//import { useHistory } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function submit(e) {
    e.preventDefault();

    if (!username || !password) {
      // check if fields are null
      setError("Please enter both username and password");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        username,
        password,
      });

      if (response.status === 200) {
        setSuccess("login successful! Redirecting to Main page...");
        setTimeout(() => {
          navigate("/Mainpage", { state: { username: username } }); // redirect the user to the login page
        }, 3000);
        setError("");
      } else {
        alert("Login failed");
      }
    } catch (e) {
      setError("Invalid credentials");
    }
  }

  return (
    <div className="login-page">
      <div className="login">
        <h1>Login</h1>

        <form action="POST">
          <input
            type="text"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="Username"
            name="username"
            id="username"
            style={{ fontSize: "large" }}
          />
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
            name="password"
            id="password"
            style={{ fontSize: "large" }}
          />
          <input type="submit" onClick={submit} />
          {success && <div className="success-message">{success}</div>}
          {error && <div className="error-message">{error}</div>}
        </form>
        <br />
        <p>OR</p>
        <br />

        <Link to="/register">
          <button className="register-button">Register</button>
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
