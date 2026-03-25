import React, { useState } from 'react'
import { assets } from "../assets/img/assets";
import "./Navbar.css"

function Navbar() {

  const [open, setOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const doctor = JSON.parse(localStorage.getItem("doctor"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("doctor");
    window.location.href = "/";
  };

  return (
    <div className="nav">
      <div className="logo">
        <a href="/">
          <img src={assets.logo} alt="logo" />
        </a>
      </div>

      <div className="content">
        <ul>
          <a href="/">
            <li>Home</li>
          </a>

          <a href="/about">
            <li>About</li>
          </a>

          <a href="/contact">
            <li>Contact</li>
          </a>

          {/* Register only if not logged in */}
          {!user && !doctor && (
            <a href="/register" id="Regster">
              <li>Register</li>
            </a>
          )}

          {/* If user or doctor logged in */}
          {(user || doctor) && (
            <li style={{ position: "relative" }}>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => setOpen(!open)}
              >
                👤
              </span>

              {open && (
                <div className="logoutBox">
                  <button
                    onClick={handleLogout}
                    style={{ width: "100px", height: "40px", marginLeft:"120px"}}
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;