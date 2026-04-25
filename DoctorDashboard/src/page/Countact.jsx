import React, { useState } from 'react';
import "./Countact.css";

function Countact() {

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

      setFormData({ name: "", email: "", message: "" });

    } catch (error) {
      console.log(error);
      alert("Error sending message");
    }
  };

  return (
    <div>
      <div className="DocContact" style={{width:"96%",marginLeft:"25px",borderRadius:"10px",height:"550px",backgroundColor:"#bab8b8aa", marginTop:"100px"}}>
        <div className="DoctorHelp" style={{display:"flex", gap:"10px",width:"100%"}}>

          <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",gap:"20px" ,width:"50%"}}>

            <label style={{marginRight:"420px"}}>Full name</label>
            <input 
              type="text" 
              name="name"                     // ✅ FIX
              placeholder='Enter your name'
              value={formData.name}          // ✅ FIX
              onChange={handleChange} 
            />

            <label style={{marginRight:"450px"}}>Email</label>
            <input 
              type="email"                   // ✅ FIX
              name="email"                  // ✅ FIX
              placeholder='Enter your gmail'
              value={formData.email}        // ✅ FIX
              onChange={handleChange}
            />

            <label>Problem Description</label>
            <input 
              type="text" 
              name="message"                // ✅ FIX
              placeholder="Enter your problem"
              value={formData.message}      // ✅ FIX
              onChange={handleChange} 
            />

            <br />

            <button type='submit' style={{width:"150px", display:"flex",alignItems:"center",justifyContent:"center",marginLeft:"200px"}}>
              Submit
            </button>

          </form>

          <div className="DoctoDes" style={{width:"50%"}}>
            <h1>Version</h1>
            <br />
            <p>
              If you experience any issues while using this website, you can submit your problem here. 
              Our team will carefully review your concern and take the necessary steps to resolve it 
              as quickly as possible. We are committed to providing a smooth and reliable user experience.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Countact;