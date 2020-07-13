const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "cb5e07a13fa089",
      pass: "c4d0ab96baf2f2"
    }
  });

const sendWelcome = (email, name) => {
    transporter.sendMail({
    from: 'dungvn.dev@gmail.com',
    to: email,
    subject: "Welcome new employee",
    html: '<p>Welcome to Scuti.</b><ul><li>Username:' + name + '</li><li>Email:' + email + '</li></ul>'
    });
}

module.exports = {
    sendWelcome
}
