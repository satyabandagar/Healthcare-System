import React, { useState } from "react";
import axios from "axios";
import "./DoctorRegister.css";
function DoctorRegister() {
  const [doctor, setDoctor] = useState({
    name: "",
    email: "",
    password: "",
    speciality: "",
    degree: "",
    experience: "",
    about: "",
    fees: "",
    line1: "",
    line2: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setDoctor({
      ...doctor,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", doctor.name);
    formData.append("email", doctor.email);
    formData.append("password", doctor.password);
    formData.append("speciality", doctor.speciality);
    formData.append("degree", doctor.degree);
    formData.append("experience", doctor.experience);
    formData.append("about", doctor.about);
    formData.append("fees", doctor.fees);
    formData.append("line1", doctor.line1);
    formData.append("line2", doctor.line2);
    formData.append("image", image);

    await axios.post("http://localhost:5000/api/register", formData);

    alert("Doctor Registered Successfully");
  };

  return (
    <div className="" style={{marginTop:"100px", width:"96%",marginLeft:"25px",backgroundColor:"#b3b0b0bf",borderRadius:"15px", padding:"20px"}}>
      <h2 style={{display:"flex", alignItems:"center", justifyContent:"center"}}>Doctor Register</h2>

      <div className="container">
  <form onSubmit={handleSubmit} className="form">
    
    <div className="doctor-register">

     
      <div className="form-row">
        <div className="form-group">
          <label>Full Name</label>
          <input name="name" placeholder="Doctor Name" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Gmail</label>
          <input name="email" placeholder="Email" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input name="password" type="password" placeholder="Password" onChange={handleChange} />
        </div>
      </div>

      
      <div className="form-row">
        <div className="form-group">
          <label>Speciality</label>
          <input name="speciality" placeholder="Speciality" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Degree</label>
          <input name="degree" placeholder="Degree" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Experience</label>
          <input name="experience" placeholder="Experience" onChange={handleChange} />
        </div>
      </div>

     
      <div className="form-row">
        <div className="form-group">
          <label>Fees</label>
          <input name="fees" placeholder="Fees" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Address Line 1</label>
          <input name="line1" placeholder="Address Line 1" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Address Line 2</label>
          <input name="line2" placeholder="Address Line 2" onChange={handleChange} />
        </div>
      </div>

     
      <div className="form-row">
        <div className="form-group full">
          <label style={{marginBottom:"10px"}}>About</label>
          <textarea name="about" placeholder="About Doctor" onChange={handleChange}></textarea>
        </div>

        <div className="form-group full">
          <label>Upload Image</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
      </div>

      
      <div className="form-actions">
        <button className="btn-submit">Register</button>
        <p>OR</p>
        <a href="/login" className="btn-login">Login</a>
      </div>

    </div>
  </form>
</div>
    </div>
  );
}

export default DoctorRegister;
