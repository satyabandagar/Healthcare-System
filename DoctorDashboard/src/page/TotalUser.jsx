import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TotalUser.css";

function TotalUser() {
  const [patients, setPatients] = useState(0);
  const [bookings, setBookings] = useState(0);
  const [appointments, setAppointments] = useState([]);

  const doctor = JSON.parse(localStorage.getItem("doctor"));
  const doctorId = doctor?._id;

  const navigate = useNavigate();

  const loadData = () => {
    fetch(`http://localhost:5000/api/appointment/total-patients/${doctorId}`)
      .then((res) => res.json())
      .then((data) => setPatients(data.total));

    fetch(`http://localhost:5000/api/appointment/total-bookings/${doctorId}`)
      .then((res) => res.json())
      .then((data) => setBookings(data.total));

    fetch(`http://localhost:5000/api/appointment/doctor/${doctorId}`)
      .then((res) => res.json())
      .then((data) => setAppointments(data));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAccept = async (id) => {
    await fetch(`http://localhost:5000/api/appointment/accept/${id}`, {
      method: "PUT",
    });

    alert("Appointment Accepted");
    loadData();
  };

  const handleReject = async (id) => {
    await fetch(`http://localhost:5000/api/appointment/reject/${id}`, {
      method: "PUT",
    });

    alert("Appointment Rejected");
    loadData();
  };

  return (
    <div className="TotolUser">
      <div className="totalB">
        <div className="totalpatients">
          <h1>Total Patients: {patients}</h1>
        </div>

        <div className="totalbooking">
          <h1 className="booked">Total Bookings: {bookings}</h1>
        </div>

        {/* ⚠️ Keep your button but REMOVE item.id from here */}
        <div className="Prescription">
          <button onClick={() => alert("Please click Prescription button in table below")}>
            Prescription
          </button>
        </div>
      </div>

      <hr style={{ marginTop: "50px" }} />

      <h2 style={{ marginTop: "40px", marginLeft: "75px" }}>
        Patient Appointment List
      </h2>

      <div className="table-container">
        <table border="1">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Email</th>
              <th>Date</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Action</th>
              <th>Contact</th>
              <th>Prescription</th> {/* ✅ ADDED */}
            </tr>
          </thead>

          <tbody>
            {appointments.map((item) => (
              <tr key={item.id}>
                <td><b>{item.patient_name}</b></td>

                <td>{item.patient_email}</td>

                <td>
                  {new Date(item.appointment_date).toLocaleString("en-IN")}
                </td>

                <td>
                  <span
                    style={{
                      color:
                        item.status === "accepted"
                          ? "green"
                          : item.status === "rejected"
                          ? "red"
                          : item.status === "cancelled"
                          ? "gray"
                          : "orange",
                      fontWeight: "bold",
                    }}
                  >
                    {item.status}
                  </span>
                </td>

                <td>
                  {item.payment_status === "paid" ? (
                    <span style={{ color: "green", fontWeight: "bold" }}>
                      Payment ✅
                    </span>
                  ) : (
                    <span style={{ color: "gray" }}>Payment Pending</span>
                  )}
                </td>

                <td>
                  <button onClick={() => handleAccept(item.id)}>Accept</button>
                  <br />
                  {item.payment_status !== "paid" && (
                    <button onClick={() => handleReject(item.id)}>Reject</button>
                  )}
                </td>

                <td>
                  <button onClick={() => navigate(`/video/${item.id}`)}>
                    Contact Patient
                  </button>
                </td>

                {/* ✅ CORRECT BUTTON HERE */}
                <td>
                  <button
                    onClick={() =>
                      navigate("/prescription", { state: { id: item.id } })
                    }
                    style={{ background: "#333", color: "white" }}
                  >
                    Prescription
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TotalUser;