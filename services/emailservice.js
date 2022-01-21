//using nodemailer

const nodemailer = require("nodemailer");

//sendmail() function is made by me while sendMail({}) is nodemailer's inbuilt function
async function sendmail({from, to, subject, text, html}) {
  console.log(`sending mail to ${to} from ${from}`);
  let transporter = nodemailer.createTransport({
    service:'gmail',
    // host: process.env.SMTP_HOST,
    // port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
  //console.log("running in sendmail in emailservice.js- completed transporter");
  let info = await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });
  console.log("mail sent successfully!");
}
//this sendMail() is the method of NodeMailer

module.exports = sendmail;