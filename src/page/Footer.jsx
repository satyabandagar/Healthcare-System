import React from "react";
import "./Footer.css"
function Footer() {
  return (
    <div className="footer">
      <div className="about">
        <p>
          Our platform provides easy online doctor appointments and telemedicine
          services. We aim to connect patients with experienced doctors quickly
          and securely, improving healthcare access for everyone.
        </p>
      </div>
      <div className="contact">
        <ul>
            <li>91+ 8767183661</li>
            <li>G-mail: bandagar@gmail.com</li>
            <li>Help: 100</li>
        </ul>
      </div>
      <div className="social">
        <ul>
            <li>whatspa</li>
            <li>twiter</li>
            <li>Instagram</li>
            <li>Facebook</li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
