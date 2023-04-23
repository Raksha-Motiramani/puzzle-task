import React, { useState } from "react";
import axios from "axios"
import { useNavigate , Link } from "react-router-dom";

function RegisterPage() {
   const navigate = useNavigate();
   const [username , setUsername] = useState('');
   const [password , setPassword] = useState('');
   const [error, setError] = useState('');
   const [success, setSuccess] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


   async function submit(e) {
     e.preventDefault();

     if (!username) {
      setError('Please enter a username');
      return;
    }

    if (!password) {
      setError('Please enter a password');
      return;
    }

     try{
      await axios.post("http://localhost:5000/auth/register", {
        username,
        password
      })
      setSuccess('Registration successful! Redirecting to login page...');
      setUsername('');
      setPassword('');
      setTimeout(() => {
        navigate('/login'); // redirect the user to the login page
      }, 3000);
     }
     catch (e) {
      setError('Registration failed. Please try again later.');
     }
   }

  return (
    <div className="login-page">
        <div className="login">
      <h1>Register</h1>
    
      <form action="POST">
         <input type="text" onChange={handleUsernameChange} placeholder="Username" name="" id="username" style={{ fontSize: "large" }}/>
         <input type="password" onChange={handlePasswordChange} placeholder="Password" name="" id="password" style={{ fontSize: "large" }}/>
         <input type="submit" onClick={submit} />
         {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
      </form>

      <br />
      <p>OR</p>
      <br />

      <Link to="/login">
          <button className="register-button">Login</button>
        </Link>
      </div>
    </div>
  );
}

export default RegisterPage;