const nodemailer = require("nodemailer");

const sendEmail = async (patientEmail, filePath, patientName) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "bandagarsatyappa91@gmail.com",
        pass: "votc gvjb rnlo glnq" 
      }
    });

    const mailOptions = {
      from: "bandagarsatyappa91@gmail.com",
      to: patientEmail,
      subject: "Your Prescription",
      text: `Hello ${patientName},\n\nYour prescription is attached.\n\nThank you.`,
      attachments: [
        {
          filename: "prescription.pdf",
          path: filePath
        }
      ]
    };

    await transporter.sendMail(mailOptions);

    console.log("Email sent successfully ✅");
  } catch (error) {
    console.log("Email error ❌", error);
  }
};

module.exports = sendEmail;