const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "kyalin.khanal@gmail.com",
    pass: "wagj epfo pxxc bsvd",
  },
});

async function sendEmail(from, to, subject, text, html) {
  
  const info = await transporter.sendMail({
    from, to, subject, text, html
  });


  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}



module.exports = sendEmail