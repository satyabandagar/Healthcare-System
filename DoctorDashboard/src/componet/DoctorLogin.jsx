import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./DoctorLogin.css";

function DoctorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await axios.post("http://localhost:5000/api/login", {
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
    <div className="" style={{ marginTop: "100px" }}>
      <div className="DocLog" style={{display:"flex", flexDirection:"column", alignItems:"center",gap:"20px"}}>
        <h2>Doctor Login</h2>

        <div className="" style={{display:"flex", flexDirection:"column",gap:"20px"}}>
          <input
            type="email"
            placeholder="Email"
            className="form-control mb-2"
            onChange={(e) => setEmail(e.target.value)}
            style={{width:"300px",padding:"10px", borderRadius:"5px"}}
          />

          <input
            type="password"
            placeholder="Password"
            className="form-control mb-2"
            onChange={(e) => setPassword(e.target.value)}
            style={{width:"300px",padding:"10px", borderRadius:"5px"}}
          />
        </div>

        <button
          style={{ backgroundColor: "rgba(71, 200, 54, 0.78)" }}
          className="btn btn-primary"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default DoctorLogin;
