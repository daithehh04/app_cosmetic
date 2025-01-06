"use strict";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const verifyMail = async (to, subject, data) => {
  const info = await transporter.sendMail({
    from: '"Dai The" <daithehh04@gmail.com>', // sender address
    to,
    subject, // Subject line
    html: `
    <h3>Mã xác nhận: ${data.code}</h3>
      <i>Lưu ý mã code chỉ có tác dụng trong vòng 1 phút!</i>
    `, // html body
  });
  return info;
};

module.exports = verifyMail;
