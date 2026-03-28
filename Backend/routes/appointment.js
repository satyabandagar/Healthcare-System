const express = require("express");
const router = express.Router();
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

const {doctor_id,doctor_name,patient_name,patient_email,fees} = req.body;

const sql = `
INSERT INTO appointments
(doctor_id,doctor_name,patient_name,patient_email,fees,status)
VALUES (?,?,?,?,?,?)
`;

db.query(sql,
[doctor_id,doctor_name,patient_name,patient_email,fees,"booked"],
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

module.exports = router;