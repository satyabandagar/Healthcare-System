import React, { useEffect, useState } from "react";
import "./Appointment.css";
import { useNavigate } from "react-router-dom";

function Appointment() {
  const [data, setData] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const loadData = () => {
    fetch(`http://localhost:5000/api/appointment/my/${user.email}`)
      .then((res) => res.json())
      .then((result) => setData(result));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCancel = async (id) => {
    await fetch(`http://localhost:5000/api/appointment/cancel/${id}`, {
      method: "DELETE",
    });

    alert("Appointment Cancelled");
    loadData();
  };

  const handlePayment = async (item) => {
    const orderRes = await fetch(
      "http://localhost:5000/api/payment/create-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: item.fees,
        }),
      }
    );

    const orderData = await orderRes.json();

    const options = {
      key: "rzp_test_SWdV4V4BpskctR",
      amount: orderData.amount,
      currency: "INR",
      name: "Doctor Appointment",
      description: "Consultation Fee",
      order_id: orderData.id,

      handler: async function () {
        await fetch(
          `http://localhost:5000/api/appointment/payment-success/${item.id}`,
          {
            method: "PUT",
          }
        );

        alert("Payment Successful ✅");
        loadData();
      },

      prefill: {
        name: user.name,
        email: user.email,
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="appontUser">
      <h1>My Appointments</h1>

      <table className="appointmentTable">
        <thead>
          <tr>
            <th>Doctor</th>
            <th>Patient</th>
            <th>Date</th>
            <th>Status</th>
            <th>Video / Payment</th>
            <th>Cancel</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.doctor_name}</td>
              <td>{item.patient_name}</td>
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
                {item.status === "accepted" &&
                item.payment_status !== "paid" ? (
                  <button
                    style={{
                      background: "orange",
                      color: "white",
                      width: "120px",
                      height: "40px",
                    }}
                    onClick={() => handlePayment(item)}
                  >
                    Pay Fee
                  </button>
                ) : item.status === "accepted" &&
                  item.payment_status === "paid" ? (
                  <button
                    style={{
                      background: "green",
                      color: "white",
                      width: "120px",
                      height: "40px",
                    }}
                    onClick={() => navigate(`/video/${item.id}`)}
                  >
                    Contact
                  </button>
                ) : (
                  <button
                    style={{
                      background: "gray",
                      color: "white",
                      width: "120px",
                      height: "40px",
                    }}
                    disabled
                  >
                    Waiting
                  </button>
                )}
              </td>

              <td>
                <button
                  style={{
                    background: "red",
                    color: "white",
                    width: "100px",
                    height: "40px",
                  }}
                  onClick={() => handleCancel(item.id)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Appointment;