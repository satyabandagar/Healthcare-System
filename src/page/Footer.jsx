import React from "react";
import "./Footer.css"
function Footer() {
  return (
    <div className="footerPage">
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
          <li style={{listStyle:"none"}}><h3>Contact</h3></li>
            <li>91+ 8767183661</li>
            <li>G-mail: bandagar@gmail.com</li>
            <li>Help: 100</li>
        </ul>
      </div>
      <div className="social">
        <ul>
          <li style={{listStyle:"none"}}><h3>Social Media</h3></li>
            <li>WhatsApp</li>
            <li>Twitter</li>
            <li>Instagram</li>
            <li>Facebook</li>
        </ul>
      </div>
      </div>
      
      <p style={{color:"#fff", display:"flex", alignItems:"center", justifyContent:"center",backgroundColor:"#222"}}>© 2026 Telemedicine Rural Healthcare</p>
    </div>
  );
}

export default Footer;
