const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();


const sendEmail = expressAsyncHandler(async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL, // Replace with your actual email alias
      pass: process.env.USER_PASS, // Replace with your actual application-specific password
    },
    authMethod: "LOGIN", // Explicitly specify the authentication method
  });

  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: req.body.email,
    subject: req.body.subject,
    html:`<h1>${req.body.message}<h1>`,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(info.response);


});

module.exports = { sendEmail };
