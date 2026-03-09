import React from "react";
import "./Contact.css";

function Contact() {
  return (
    <div className="contact1">

      <h1>Contact Us</h1>

      <div className="contact-container">

        <div className="contact-info">
          <h3>Contact Information</h3>

          <p>📞 Phone: +91 8767183661</p>
          <p>📧 Email: telemedicine@gmail.com</p>
          <p>📍 Address: Pune, Maharashtra, India</p>
        </div>

        <div className="contact-form">
          <h3>Send Message</h3>

          <form>
            <input type="text" placeholder="Your Name" />

            <input type="email" placeholder="Your Email" />

            <textarea placeholder="Your Message"></textarea>

            <button>Send Message</button>
          </form>
        </div>

      </div>

    </div>
  );
}

export default Contact;