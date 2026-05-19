import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./DoctorList.css";

function DoctorList() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/doctors/${id}`)
      .then((res) => res.json())
      .then((data) => setDoctor(data));
  }, [id]);

  if (!doctor) {
    return <h1>Loading...</h1>;
  }

  const handleBook = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const res = await fetch("http://localhost:5000/api/appointment/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        doctor_id: doctor._id,
        doctor_name: doctor.name,
        patient_name: user.name,
        patient_email: user.email,
        fees: doctor.fees,
        appointment_date: date,
      }),
    });

    const data = await res.json();
    alert(data.message);

    window.location.href = "/appointment";
  };

  return (
    <>
      <div id="docInfo">
        <div className="docImg">
          <img
            src={`http://localhost:5000/uploads/${doctor.image}`}
            width="250"
          />
        </div>
        <div className="docInfo">
          <h1>{doctor.name}</h1>
          <p>
            <b>Speciality:</b> {doctor.speciality}
          </p>
          <p>
            <b>Degree:</b> {doctor.degree}
          </p>
          <p>
            <b>Experience:</b> {doctor.experience}
          </p>
          <p>
            <b>Fees:</b> ₹{doctor.fees}
          </p>
          <p>
            <b>About:</b> {doctor.about}
          </p>
          <p>
            <b>Address:</b> {doctor.line1}, {doctor.line2}
          </p>
          <div className="Date">
            <label htmlFor="date">Select Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
        </div>
      </div>
      <div className="DocBook">
        <Link
          style={{
            width: "150px",
            height: "50px",
            backgroundColor: "red",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "30px",
            color: "black",
            borderRadius: "15px",
            marginTop: "30px",
          }}
          to="/"
        >
          Back
        </Link>
        <Link
          onClick={handleBook}
          style={{
            width: "150px",
            height: "50px",
            backgroundColor: "#25e810",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "30px",
            color: "black",
            borderRadius: "15px",
            marginTop: "30px",
          }}
        >
          Book
        </Link>
      </div>
    </>
  );
}

export default DoctorList;
