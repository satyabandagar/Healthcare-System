import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom"; // ✅ ADDED

function Prescription() {
  const printRef = useRef();

  // ✅ ADDED (get appointment id from previous page)
  const location = useLocation();
  const appointmentId = location.state?.id;

  const [problems, setProblems] = useState([""]);
  const [solutions, setSolutions] = useState([""]);

  const sendPrescription = async (id) => {
    if (!id) {
      alert("Appointment ID not found ❌");
      return;
    }
const htmlContent = printRef.current.innerHTML;
   await fetch(
  `http://localhost:5000/api/appointment/send-prescription/${id}`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
      problems,
      solutions,
      html: htmlContent ,
    }),
  }
);

    alert("Prescription sent to patient!");
  };

  const handleProblemChange = (index, value) => {
    const updated = [...problems];
    updated[index] = value;
    setProblems(updated);
  };

  const addProblem = () => {
    setProblems([...problems, ""]);
  };

  const handleSolutionChange = (index, value) => {
    const updated = [...solutions];
    updated[index] = value;
    setSolutions(updated);
  };

  const addSolution = () => {
    setSolutions([...solutions, ""]);
  };

  const [data, setData] = useState({
    doctorName: "",
    speciality: "",
    date: "",
    patientName: "",
    age: "",
    gender: "",
    problem: "",
    medicines: "",
    advice: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handlePrint = () => {
    const printContent = printRef.current.cloneNode(true);

    const inputs = printContent.querySelectorAll("input");
    inputs.forEach((input) => {
      input.setAttribute("value", input.value);
    });

    const textareas = printContent.querySelectorAll("textarea");
    textareas.forEach((textarea) => {
      textarea.innerHTML = textarea.value;
    });

    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent.innerHTML;

    window.print();

    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  const handleWhatsApp = () => {
    const phone = data.phone;

    const message = `
Doctor: ${data.doctorName}
Speciality: ${data.speciality}
Date: ${data.date}

Patient: ${data.patientName}
Age: ${data.age}
Gender: ${data.gender}

Problems:
${problems.map((p, i) => `${i + 1}. ${p}`).join("\n")}

Solutions:
${solutions.map((s, i) => `${i + 1}. ${s}`).join("\n")}

Advice:
${data.advice}
  `;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  };

  return (
    <>
      <div className="" style={{marginTop:"100px"}}>
        <div
          ref={printRef}
          style={{
            padding: "20px",
            width: "800px",
            margin: "auto",
            border: "1px solid #000",
            backgroundColor: "#f7f7f7a5",
          }}
        >
          {/* ✅ HEADER (STATIC) */}
          <div
            style={{
              textAlign: "center",
              borderBottom: "2px solid black",
              paddingBottom: "10px",
            }}
          >
            <h1>Telemedicine Access For Rural Healthcare</h1>
            <div
              className=""
              style={{ display: "flex", gap: "50px", padding: "10px" }}
            >
              <p>
                Madgyal Jath, Dist-Sangli, Pin-code = 416413, Maharashtra, India
              </p>
              <p>Phone: +91 8767183661</p>
            </div>
          </div>

          <div style={{ marginTop: "10px", display: "flex" }}>
            <p>
              <b>Doctor Name:</b>
              <input
                name="doctorName"
                onChange={handleChange}
                style={{
                  marginLeft: "10px",
                  padding: "3px",
                  borderRadius: "10px",
                }}
              />
            </p>
            <p>
              <b>Speciality:</b>
              <input
                name="speciality"
                onChange={handleChange}
                style={{
                  marginLeft: "10px",
                  padding: "3px",
                  borderRadius: "10px",
                }}
              />
            </p>
            <p>
              <b>Date:</b>
              <input
                type="date"
                name="date"
                onChange={handleChange}
                style={{
                  marginLeft: "10px",
                  padding: "3px",
                  borderRadius: "10px",
                }}
              />
            </p>
          </div>

          <div style={{ marginTop: "10px", display: "flex", padding: "10px" }}>
            <p>
              <b>Patient Name:</b>
              <input
                name="patientName"
                onChange={handleChange}
                style={{ marginLeft: "10px" }}
              />
            </p>
            <p>
              <b>Age:</b>
              <input
                name="age"
                style={{ width: "60px", marginLeft: "10px" }}
                onChange={handleChange}
              />
              <b style={{ marginLeft: "20px" }}>Gender:</b>
              <input
                name="gender"
                style={{ width: "80px", marginLeft: "10px" }}
                onChange={handleChange}
              />
            </p>
          </div>
          <div className="">
            <p>
              <b>WhatsApp No: </b>
              <input
                type="text"
                name="phone"
                placeholder="Patient WhatsApp Number"
                onChange={handleChange}
              />
            </p>
          </div>

          <div className="" style={{ display: "flex", gap: "20px" }}>
            <div style={{ marginTop: "15px" }}>
              <p>
                <b>Symptoms / Problem:</b>
                <button
                  onClick={addProblem}
                  style={{
                    width: "100px",
                    height: "30px",
                    backgroundColor: "#533fedd7",
                    padding: "4px",
                    margin: "5px",
                  }}
                >
                  + Add Problem
                </button>
              </p>

              {problems.map((p, index) => (
                <input
                  key={index}
                  type="text"
                  value={p}
                  onChange={(e) => handleProblemChange(index, e.target.value)}
                  style={{
                    width: "100%",
                    marginBottom: "5px",
                    padding: "5px",
                    borderRadius: "10px",
                  }}
                />
              ))}
            </div>

            <div style={{ marginTop: "15px" }}>
              <p>
                <b>Solution / Medicines:</b>
                <button
                  onClick={addSolution}
                  style={{
                    width: "100px",
                    height: "30px",
                    backgroundColor: "#1ee736d6",
                    padding: "4px",
                    margin: "5px",
                  }}
                >
                  + Add Solution
                </button>
              </p>

              {solutions.map((s, index) => (
                <input
                  key={index}
                  type="text"
                  value={s}
                  onChange={(e) => handleSolutionChange(index, e.target.value)}
                  style={{
                    width: "100%",
                    marginBottom: "5px",
                    padding: "5px",
                    borderRadius: "10px",
                  }}
                />
              ))}
            </div>
          </div>

          <div style={{ marginTop: "15px" }}>
            <p>
              <b>Doctor Advice:</b>
            </p>
            <textarea
              name="advice"
              rows="3"
              style={{
                width: "100%",
                borderRadius: "10px",
                padding: "10px",
              }}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* ✅ SIGNATURE */}
          <div style={{ marginTop: "30px", textAlign: "right" }}>
            <p>Doctor Signature</p>
            <p>__________________</p>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={handlePrint}
            style={{ marginRight: "10px", borderRadius: "10px" }}
          >
            Print Prescription
          </button>

          {/* ✅ FIXED HERE ONLY */}
          <button
            onClick={() => sendPrescription(appointmentId)}
            style={{ marginLeft: "10px" }}
          >
            Send on Gmail
          </button>
        </div>
      </div>
    </>
  );
}

export default Prescription;
