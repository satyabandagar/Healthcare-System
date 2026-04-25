const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "bandagarsatyappa91@gmail.com",   
        pass: "votc gvjb rnlo glnq", 
      },
    });

    const mailOptions = {
      from: email,
      to: "bandagarsatyappa91@gmail.com",
      subject: `Patient Problem from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Message sent successfully" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error sending message" });
  }
});

module.exports = router;