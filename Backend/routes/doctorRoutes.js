const express = require("express");
const router = express.Router();
const upload = require("../upload");
const db = require("../db");

const doctorController = require("../controllers/doctorController");

router.get("/doctors", doctorController.getDoctors);

router.get("/doctors/:id", (req, res) => {
  const sql = "SELECT * FROM doctors WHERE _id = ?";

  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      res.send("Database Error");
    } else {
      res.json(result[0]);
    }
  });
});

router.post("/register", upload.single("image"), (req, res) => {
  const {
    name,
    email,
    password,
    speciality,
    degree,
    experience,
    about,
    fees,
    line1,
    line2
  } = req.body;

  const image = req.file.filename;

  const sql = `
    INSERT INTO doctors
    (name, image, speciality, degree, experience, about, fees, line1, line2, email, password)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, image, speciality, degree, experience, about, fees, line1, line2, email, password],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send("Database Error");
      } else {
        res.send("Doctor Registered Successfully");
      }
    }
  );
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM doctors WHERE email=? AND password=?";

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.log(err);
      res.send("Database Error");
    } else {
      if (result.length > 0) {
        res.json(result[0]); // doctor data send
      } else {
        res.send("Invalid Email or Password");
      }
    }
  });
});

module.exports = router;