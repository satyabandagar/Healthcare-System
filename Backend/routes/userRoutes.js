const express = require("express");
const router = express.Router();
const db = require("../db");

// USER REGISTER
router.post("/register", (req, res) => {

  const { name, email, password, mobile, gender } = req.body;

  if (!name || !email || !password || !mobile || !gender) {
    return res.json({ success: false, message: "All fields required" });
  }

  // check email exists
  const checkSql = "SELECT * FROM users WHERE email=?";

  db.query(checkSql, [email], (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ success: false });
    }

    if (result.length > 0) {
      return res.json({ success: false, message: "Email already exists" });
    }

    // insert user
    const sql = "INSERT INTO users(name,email,password,mobile,gender) VALUES(?,?,?,?,?)";

    db.query(sql, [name, email, password, mobile, gender], (err, result) => {
      if (err) {
        console.log(err);
        return res.json({ success: false });
      }

      res.json({ success: true, message: "User Registered Successfully" });
    });

  });

});


// USER LOGIN
router.post("/login", (req, res) => {

  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email=?";

  db.query(sql, [email], (err, result) => {

    if (err) {
      console.log(err);
      return res.json({ login: false });
    }

    if (result.length === 0) {
      return res.json({ login: false });
    }

    if (result[0].password === password) {
      res.json({ login: true, user: result[0] });
    } else {
      res.json({ login: false });
    }

  });

});

module.exports = router;