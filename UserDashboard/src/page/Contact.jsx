import React, { useState } from "react";
import "./Contact.css";

function Contact() {

  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      alert(data.message);

      // optional: clear form
      setFormData({ name: "", email: "", message: "" });

    } catch (error) {
      console.log(error);
      alert("Error sending message");
    }
  };

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

          {/* ✅ ONLY ADD onSubmit */}
          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
            />

            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
            ></textarea>

            <button type="submit">Send Message</button>

          </form>
        </div>

      </div>

    </div>
  );
}

export default Contact;