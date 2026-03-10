import React from "react";
import { Link } from "react-router-dom";
import "./HomeDoctor.css";
import { doctors } from "../assets/img/assets";
import { assets } from "../assets/img/assets";

function HomeDoctor() {
  return (
    <>
      <div className="DoctorList">
        <div className="list">
          <h1>Doctor List</h1>
        </div>

        <div className="HomeDoctor">
          {doctors.map((doctor) => (
            <div className="doctor" key={doctor._id}>
              <div className="img" style={{ width: "100%", height: "370px" }}>
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div className="doctorInfo">
                <h5>
                  {" "}
                  <samp
                    style={{
                      fontSize: "17px",
                      fontWeight: "bold",
                      color: "rgb(1, 121, 23)",
                      marginLeft: "15px",
                    }}
                  >
                    name:
                  </samp>{" "}
                  {doctor.name}
                </h5>
                <p>
                  <samp
                    style={{
                      color: "blue",
                      fontSize: "17px",
                      fontWeight: "bold",
                      marginLeft: "15px",
                    }}
                  >
                    Speciality:
                  </samp>{" "}
                  {doctor.speciality}
                </p>
                <p>
                  <samp
                    style={{
                      color: "green",
                      fontSize: "17px",
                      fontWeight: "bold",
                      marginLeft: "15px",
                    }}
                  >
                    Fee: ₹
                  </samp>
                  {doctor.fees}
                </p>
                <Link
                  to={`/doctor/${doctor._id}`}
                  style={{
                    width: "80px",
                    height: "30px",
                    backgroundColor: "rgba(109, 236, 89, 0.9)",
                    marginLeft: "170px",
                    borderRadius: "15px",
                    fontSize: "15px",
                    display: "flex",
                    alignItems:"center",
                    justifyContent:"center",
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section>
        <div className="appoment">
          <div className="appInfo">
            <h1 style={{ color: "#222" }}>
              Book Appointment <br /> <span>With 100+</span> Trusted Doctors
            </h1>
            <button
              style={{
                marginRight: "500px",
                marginTop: "80px",
                width: "250px",
              }}
            >
              Create Accounnt
            </button>
          </div>
          <div className="appImg">
            <img src={assets.appointment_img} alt="" />
          </div>
        </div>
      </section>
    </>
  );
}

export default HomeDoctor;
