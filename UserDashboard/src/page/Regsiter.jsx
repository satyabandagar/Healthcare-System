import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Regsiter.css";

function Regsiter() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    gender: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Full Name validation (only letters and space)
    const nameRegex = /^[A-Za-z ]+$/;

    if (!nameRegex.test(form.name)) {
      setError("Full Name must contain only letters");
      return;
    }

    setError("");

    fetch("http://localhost:5000/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Registered Successfully");
        navigate("/login");
      });
  };

  return (
    <div className="parentReg">
      <div className="RegUser">
        <h1>Register Patient</h1>
        <form onSubmit={handleSubmit}>
          <div id="formReg">
            <label>Full Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              required
            />
            <br />

            {/* Error message */}
            {error && (
              <p style={{ color: "red", fontSize: "14px" }}>
                {error}
              </p>
            )}

            <label>Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <br />

            <label>Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <br />

            <label>Mobile No:</label>
            <input
              type="text"
              name="mobile"
              placeholder="Mobile"
              onChange={handleChange}
              required
            />
            <br />

            <select name="gender" onChange={handleChange} required>
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <br />
            <br />

            <center>
              <button
                type="submit"
                style={{ height: "40px", marginRight: "90px" }}
              >
                Submit
              </button>
            </center>
          </div>

          <br />
          <p
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
            }}
          >
            Or
          </p>
        </form>

        <a href="/login" style={{ marginBottom: "60px" }}>
          LogIn
        </a>
      </div>
    </div>
  );
}

export default Regsiter;