const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const db = require("../db");



// routes/appointment.js
router.get("/my/:email",(req,res)=>{

const email = req.params.email;

const sql = "SELECT * FROM appointments WHERE patient_email=?";

db.query(sql,[email],(err,result)=>{

if(err){
return res.send(err)
}

res.json(result)

})

})

// book doctor
router.post("/book",(req,res)=>{

const {doctor_id,doctor_name,patient_name,patient_email,fees,appointment_date} = req.body;

const sql = `
INSERT INTO appointments
(doctor_id,doctor_name,patient_name,patient_email,fees,appointment_date,status)
VALUES (?,?,?,?,?,?,?)
`;

db.query(sql,
[doctor_id,doctor_name,patient_name,patient_email,fees,appointment_date,"booked"],
(err,result)=>{

if(err){
 return res.send(err);
}

res.json({message:"Appointment Booked Successfully"});

});

});

router.delete("/cancel/:id",(req,res)=>{

const id = req.params.id;

const sql = "DELETE FROM appointments WHERE id=?";

db.query(sql,[id],(err,result)=>{

if(err){
return res.send(err)
}

res.json({message:"Appointment Cancelled"})

})

})



// Doctor appointments show
router.get("/doctor/:doctor_id", (req, res) => {
  const doctorId = req.params.doctor_id;

  const sql = "SELECT * FROM appointments WHERE doctor_id=?";

  db.query(sql, [doctorId], (err, result) => {
    if (err) {
      console.log(err);
      res.send("Database Error");
    } else {
      res.json(result);
    }
  });
});


// Total Bookings
router.get("/total-bookings/:doctor_id", (req, res) => {
  const sql = "SELECT COUNT(*) AS total FROM appointments WHERE doctor_id=?";

  db.query(sql, [req.params.doctor_id], (err, result) => {
    res.json(result[0]);
  });
});

// Unique Patients
router.get("/total-patients/:doctor_id", (req, res) => {
  const sql = "SELECT COUNT(DISTINCT patient_email) AS total FROM appointments WHERE doctor_id=?";

  db.query(sql, [req.params.doctor_id], (err, result) => {
    res.json(result[0]);
  });
});

// Accept appointment
router.put("/accept/:id", (req, res) => {
  const sql = "UPDATE appointments SET status='accepted' WHERE id=?";

  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      res.send("Database Error");
    } else {
      res.send("Appointment Accepted");
    }
  });
});

// Reject appointment
router.put("/reject/:id", (req, res) => {
  const sql = "UPDATE appointments SET status='rejected' WHERE id=?";

  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      res.send("Database Error");
    } else {
      res.send("Appointment Rejected");
    }
  });
});

router.put("/payment-success/:id", (req, res) => {
  const sql = "UPDATE appointments SET payment_status='paid' WHERE id=?";

  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      res.send("Database Error");
    } else {
      res.send("Payment Updated");
    }
  });
});

router.put("/videoAccept/:id", (req, res) => {
  const id = req.params.id;

  const meeting_link = "http://localhost:5173/video/" + id;

  const sql = `
  UPDATE appointments 
  SET status='accepted', meeting_link=? 
  WHERE id=?
  `;

  db.query(sql, [meeting_link, id], (err, result) => {
    if (err) return res.send(err);
    res.send("Appointment Accepted");
  });
});

router.get("/appointment-info/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT doctor_name, patient_name FROM appointments WHERE id = ?",
    [id],
    (err, result) => {
      if (err) return res.send(err);
      res.send(result[0]);
    }
  );
});


router.post("/send-prescription/:id", (req, res) => {
  const id = req.params.id;
  const { doctorName, patientName, problems, solutions, advice } = req.body;

  const sql = "SELECT * FROM appointments WHERE id=?";
  
  db.query(sql, [id], async (err, result) => {
    if (err) return res.send(err);

    const appointment = result[0];

    // 📄 CREATE PDF
    const doc = new PDFDocument();
    const filePath = `prescription_${id}.pdf`;

    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(18).text("Prescription", { align: "center" });

    doc.text(`Doctor: ${doctorName}`);
    doc.text(`Patient: ${patientName}`);

    doc.text("\nProblems:");
    problems.forEach((p, i) => doc.text(`${i + 1}. ${p}`));

    doc.text("\nSolutions:");
    solutions.forEach((s, i) => doc.text(`${i + 1}. ${s}`));

    doc.text(`\nAdvice: ${advice}`);

    doc.end();

    // 📧 SEND EMAIL WITH PDF
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "bandagarsatyappa91@gmail.com",
        pass: "votc gvjb rnlo glnq",
      },
    });

    const mailOptions = {
      from: "bandagarsatyappa91@gmail.com",
      to: appointment.patient_email,
      subject: "Your Prescription PDF",
      text: "Please find your prescription attached.",
      attachments: [
        {
          filename: "prescription.pdf",
          path: filePath,
        },
      ],
    };

    setTimeout(async () => {
      await transporter.sendMail(mailOptions);
      res.send("PDF Sent on Email ✅");
    }, 2000);
  });
});

module.exports = router;