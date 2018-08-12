var nodemailer = require("nodemailer")

var transporter = nodemailer.createTransport({
  service: process.env.NO_REPLY_SERVICE,
  auth: {
    user: process.env.NO_REPLY_EMAIL,
    pass: process.env.NO_REPLY_EMAIL_PASS
  }
})

var mailOptions = {
  from: process.env.NO_REPLY_EMAIL,
  to: "no-reply@example.com",
  subject: "Example subject Membrify",
  html: "<h3>Example body</a>"
}
  
function sendMail(subject, text, to){
  mailOptions.subject = subject
  mailOptions.html = text
  mailOptions.to = to
  if (process.env.NODE_ENV === "test")
    console.log(`\t✉ Email sent for 'test' ENV with subject: "${subject}"`)
  else
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error)
      } else {
        console.log("Email sent: " + info.response)
      }
    })
}
module.exports = {
  sendMail,
}
  
