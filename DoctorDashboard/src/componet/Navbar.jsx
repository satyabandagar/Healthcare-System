import React from 'react'
import { assets } from "../assets/img/assets";
import "./Navbar.css"

function Navbar() {
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
              <a href="about">
                <li>About</li>
              </a>
              <a href="contact">
                <li>Contect</li>
              </a>
    
              {/* {!user && ( */}
                <a href="regsiter" id="Regster">
                  <li>Regsiter</li>
                </a>
              {/* )} */}
    
              {/* {user && (
                <li style={{ position: "relative" }}>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => setOpen(!open)}
                  >
                    👤
                  </span>
    
                  {open && (
                    <div className="logoutBox">
                      <button onClick={handleLogout} style={{width:"100px", height:"40px"}}>Logout</button>
                    </div>
                  )}
                </li>
              )} */}
            </ul>
          </div>
        </div>
  )
}

export default Navbar
