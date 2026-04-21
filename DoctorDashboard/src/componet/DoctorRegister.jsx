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
    <div className="container mt-4">
      <h2>Doctor Register</h2>

      <div className="">
        <form onSubmit={handleSubmit}>
          <div className="DoctorrRegiter">
            <div className="RegBasic">
              <label htmlFor="name">Full Name</label>
              <input
                name="name"
                placeholder="Doctor Name"
                onChange={handleChange}
                
              />
              <label htmlFor="email">Gmail</label>
              <input
                name="email"
                placeholder="Email"
                onChange={handleChange}
               
              />
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                
              />
            </div>

            <div className="RegMind">
              <label htmlFor="speciality">Speciality</label>
              <input
                name="speciality"
                placeholder="Speciality"
                onChange={handleChange}
                
              />
              <label htmlFor="degree">Degree</label>
              <input
                name="degree"
                placeholder="Degree"
                onChange={handleChange}
                
              />
              <label htmlFor="experience">Experience</label>
              <input
                name="experience"
                placeholder="Experience"
                onChange={handleChange}
                
              />
            </div>

            <div className="regAddrece">
              <label htmlFor="fees">Fees</label>
              <input
                name="fees"
                placeholder="Fees"
                onChange={handleChange}
                
              />
              <label htmlFor="line1">Address line first</label>
              <input
                name="line1"
                placeholder="Address Line 1"
                onChange={handleChange}
               
              />
              <label htmlFor="line2">Address line 2nd</label>
              <input
                name="line2"
                placeholder="Address Line 2"
                onChange={handleChange}
                
              />
            </div>
            <div className="RegFee">
              <label htmlFor="about">
                About
              </label>
              <textarea
                name="about"
                placeholder="About Doctor"
                onChange={handleChange}
                
              ></textarea>
              <label htmlFor="file">Upload Img</label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className=""
              />
            </div>

            <div className="Regbtn">
              <button
                className="btn btn-primary"
                style={{ backgroundColor: "rgba(55, 218, 49, 0.76)" }}
              >
                Register
              </button>
              <p>OR</p>
              <a
                href="/login"
                style={{
                  width: "100px",
                  height: "50px",
                  backgroundColor: "#1b722266",
                  color: "black",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "25px",
                  marginBottom: "100px",
                  borderRadius: "20px",
                }}
              >
                LogIn
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DoctorRegister;
