import nodemailer from "nodemailer";
import mailGun from "nodemailer-mailgun-transport";


const auth = {
  auth: {
    api_key: "23f18c592f2d6f8536ed34d3acf92274-0f472795-ae2bfee6",
    domain: "sandbox77dcded9ca5e446c83a9cb4068d01850.mailgun.org",
  },
};

const transporter = nodemailer.createTransport(mailGun(auth));

const sendContactEmail = (email, subject, text, cb) => {
  const mailOptions = {
    from: email,
    to: "timilehin65@gmail.com",
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
};

export default sendContactEmail;
