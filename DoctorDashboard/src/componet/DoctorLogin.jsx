import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./DoctorLogin.css"

function DoctorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await axios.post("http://localhost:5000/doctor/login", {
      email,
      password,
    });

    if (res.data._id) {
      localStorage.setItem("doctor", JSON.stringify(res.data));
      navigate("/");
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Doctor Login</h2>

      <input
        type="email"
        placeholder="Email"
        className="form-control mb-2"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="form-control mb-2"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default DoctorLogin;