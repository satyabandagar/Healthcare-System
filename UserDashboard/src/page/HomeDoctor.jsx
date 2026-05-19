import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./HomeDoctor.css";
import { assets } from "../assets/img/assets";

function HomeDoctor() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    fetch("http://localhost:5000/api/doctors")
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch((err) => err);
  }, []);

  // ✅ ADD THIS (filter logic outside)
  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(search.toLowerCase()) ||
      doctor.speciality.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <div className="DoctorList">
        <div className="list" style={{ display: "flex", gap: "50px" }}>
          <h1>{t("doctorList")}</h1>
          <input
            type="text"
            placeholder="Search doctor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: "10px", borderRadius: "10px" }}
          />
        </div>

        <div className="HomeDoctor">
          {filteredDoctors.length === 0 && <p>{t("noDoctor")}</p>}

          {filteredDoctors.map((doctor) => (
            <div className="doctor" key={doctor._id}>
              <div className="img" style={{ width: "100%", height: "370px" }}>
                <img
                  src={`http://localhost:5000/uploads/${doctor.image}`}
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
                  <samp
                    style={{
                      fontSize: "17px",
                      fontWeight: "bold",
                      color: "rgb(1, 121, 23)",
                      marginLeft: "15px",
                    }}
                  >
                    {t("name")}:
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
                    {t("speciality")}:
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
                    {t("fee")}: ₹
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
                    alignItems: "center",
                    justifyContent: "center",
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                 {t("more")}
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
              {t("bookAppointment")} <br /> {t("trustedDoctors")}
            </h1>
            <a href="/regsiter">
              <button
                style={{
                  marginRight: "500px",
                  marginTop: "80px",
                  width: "250px",
                }}
              >
                {t("createAccount")}
              </button>
            </a>
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
