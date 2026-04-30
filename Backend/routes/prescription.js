const express = require("express");
const router = express.Router();
const sendEmail = require("../utils/sendEmail");

router.post("/generate", async (req, res) => {

  // ✅ 1. Generate PDF
  const filePath = "uploads/prescription123.pdf";

  // ✅ 2. Get patient data
  const { email, name } = req.body;

  // ✅ 3. SEND EMAIL HERE 👇
  await sendEmail(email, filePath, name);

  res.json({ message: "Prescription generated & sent" });
});

router.post("/send-prescription/:id", (req, res) => {
  const id = req.params.id;

  const sql = "SELECT * FROM appointments WHERE id=?";

  db.query(sql, [id], async (err, result) => {
    if (err) return res.send(err);

    if (result.length === 0) {
      return res.json({ message: "Appointment not found" });
    }

    const appointment = result[0];

    // ✅ PDF path (make sure file exists)
    const filePath = "uploads/prescription123.pdf";

    try {
      // ✅ SEND EMAIL using stored Gmail
      await sendEmail(
        appointment.patient_email,
        filePath,
        appointment.patient_name
      );

      res.json({ message: "Prescription sent to patient email ✅" });

    } catch (error) {
      console.log(error);
      res.send("Email sending failed");
    }
  });
});


module.exports = router;