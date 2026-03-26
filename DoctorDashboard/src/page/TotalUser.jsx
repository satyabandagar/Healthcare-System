import React, { useEffect, useState } from "react";
import "./TotalUser.css";

function TotalUser() {
  const [patients, setPatients] = useState(0);
  const [bookings, setBookings] = useState(0);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Total unique patients
    fetch("http://localhost:5000/api/appointment/total-patients/1")
      .then((res) => res.json())
      .then((data) => setPatients(data.total));

    // Total bookings
    fetch("http://localhost:5000/api/appointment/total-bookings/1")
      .then((res) => res.json())
      .then((data) => setBookings(data.total));

    // Doctor appointments list
    fetch("http://localhost:5000/api/appointment/doctor/1")
      .then((res) => res.json())
      .then((data) => setAppointments(data));
  }, []);

  const handleAccept = async (id) => {
    await fetch(`http://localhost:5000/api/appointment/accept/${id}`, {
      method: "PUT",
    });

    alert("Accepted");
    window.location.reload();
  };

  const handleReject = async (id) => {
    await fetch(`http://localhost:5000/api/appointment/reject/${id}`, {
      method: "PUT",
    });

    alert("Rejected");
    window.location.reload();
  };

  return (
    <div className="TotolUser">
      <div className="totalB">
        <div className="totalpatients">
          <h1>Total Patients:  {patients}</h1>
        </div>
        <div className="totalbooking">
          <h1 className="booked">Total Bookings: {bookings}</h1>
        </div>
      </div>
  < hr style={{marginTop:"50px"}} />
      <h2 style={{marginTop:"40px",marginLeft:"75px"}}>Patient List</h2>

      <div className="table-container">
        <table border="1">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((item) => (
              <tr key={item.id}>
                <td><b>{item.patient_name}</b></td>
                <td>{item.patient_email}</td>
                <td>{item.status}</td>
                <td>
                  <button onClick={() => handleAccept(item.id)} style={{margin:"10px"}}>Accept</button> 
                  <hr />
                  <button onClick={() => handleReject(item.id)} style={{margin:"10px"}}>Reject</button>
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
