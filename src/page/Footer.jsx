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
            <li> <i class="fa-solid fa-phone"></i><a href="" style={{color:"white"}}> 91+ 8767183661</a></li>
            <li><i class="fa-solid fa-envelope"></i><a href="" style={{color:"white"}}> G-mail: bandagar@gmail.com</a></li>
            <li><i class="fa-solid fa-hand-holding-medical"></i><a href="" style={{color:"white"}}> Help: 100</a></li>
        </ul>
      </div>
      <div className="social">
        <ul>
          <li style={{listStyle:"none"}}><h3>Social Media</h3></li>
            <li><i class="fa-brands fa-whatsapp"></i><a href="" style={{color:"white"}}> WhatsApp</a></li>
            <li><i class="fa-brands fa-twitter"></i><a href="" style={{color:"white"}}> Twitter</a></li>
            <li><i class="fa-brands fa-instagram"></i><a href="" style={{color:"white"}}> Instagram</a></li>
            <li><i class="fa-brands fa-facebook"></i><a href="" style={{color:"white"}}> Facebook</a></li>
        </ul>
      </div>
      </div>
      
      <p style={{color:"#fff", display:"flex", alignItems:"center", justifyContent:"center",backgroundColor:"#222"}}>© 2026 Telemedicine Rural Healthcare</p>
    </div>
  );
}

export default Footer;
