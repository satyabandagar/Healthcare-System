import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./Navabar.css";
import { assets } from "../assets/img/assets";
function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
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
            <li>{t("home")}</li>
          </a>
          <a href="about">
            <li>{t("about")}</li>
          </a>
          <a href="contact">
            <li>{t("contact")}</li>
          </a>

          {!user && (
            <a href="regsiter" id="Regster">
              <li>Regsiter</li>
            </a>
          )}

          {user && (
            <li style={{ position: "relative" }}>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => setOpen(!open)}
              >
                👤
              </span>

              {open && (
                <div
                  className="logoutBox"
                  style={{
                    border: "0.1px solid #333",
                    width: "150px",
                    height: "150px",
                  }}
                >
                  <ul
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      height: "80px",
                    }}
                  >
                    <li>
                      <a href="/profile" style={{ color: "black" }}>
                        Profile
                      </a>
                    </li>
                    <li style={{ position: "relative", bottom: "40px" }}>
                      <a href="/appointment" style={{ color: "black" }}>
                        Appointment
                      </a>
                    </li>
                  </ul>

                  <button
                    onClick={handleLogout}
                    style={{
                      width: "100px",
                      height: "40px",
                      marginTop: "10px",
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>
          )}

          <li>
            {" "}
            <div>
              <select
                onChange={(e) => changeLanguage(e.target.value)}
                value={localStorage.getItem("lang") || "en"}
              >
                <option value="en">English</option>
                <option value="mr">Marathi</option>
                <option value="hi">Hindi</option>
              </select>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
