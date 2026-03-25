import React, { useState } from "react";
import axios from "axios";
import "./DoctorRegister.css"
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

    await axios.post("http://localhost:5000/doctor/register", formData);

    alert("Doctor Registered Successfully");
  };

  return (
    <div className="container mt-4">
      <h2>Doctor Register</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Doctor Name" onChange={handleChange} className="form-control mb-2" />
        
        <input name="email" placeholder="Email" onChange={handleChange} className="form-control mb-2" />
        
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="form-control mb-2" />
        
        <input name="speciality" placeholder="Speciality" onChange={handleChange} className="form-control mb-2" />
        
        <input name="degree" placeholder="Degree" onChange={handleChange} className="form-control mb-2" />
        
        <input name="experience" placeholder="Experience" onChange={handleChange} className="form-control mb-2" />
        
        <input name="fees" placeholder="Fees" onChange={handleChange} className="form-control mb-2" />
        
        <input name="line1" placeholder="Address Line 1" onChange={handleChange} className="form-control mb-2" />
        
        <input name="line2" placeholder="Address Line 2" onChange={handleChange} className="form-control mb-2" />
        
        <textarea name="about" placeholder="About Doctor" onChange={handleChange} className="form-control mb-2"></textarea>
        
        <input type="file" onChange={(e) => setImage(e.target.files[0])} className="form-control mb-2" />

        <button className="btn btn-primary">Register</button>
        <br />
        <a href="/login">LogIn</a>
      </form>
    </div>
  );
}

export default DoctorRegister;