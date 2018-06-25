var nodemailer = require('nodemailer');
let generateEmail=(email,name) =>{
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         user: 'head.of.group.chat@gmail.com',
         pass: 'admin123@#$'
     }
 });
 const mailOptions = {
  from: 'no-reply@gmail.com', // sender address
  to: email, // list of receivers
  subject: 'Greetings', // Subject line
  html: '<p>Hi '+name+'</p><h3>Welcome To the Group Chat </h3><p>We are happy to see you in our Group Chat ! Hope You enjoy your journey with this cool app. Cheers !!!</p><p>For any queries please reach us at <i>head.of.group.chat@gmail.com</i>'// plain text body
};
transporter.sendMail(mailOptions, function (err, info) {
  if(err)
    console.log(err)
  else
    console.log(info);
});
}

let generateVerificationCode=(email,verifyCode) =>{
  
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'head.of.group.chat@gmail.com',
           pass: 'admin123@#$'
       }
   });
   const mailOptions = {
    from: 'no-reply@gmail.com', // sender address
    to: email, // list of receivers
    subject: 'Verification Code', // Subject line
    html: '<p>We are happy to see you in our Group Chat ! Hope You are enjoying your journey with us !!!</p><p>Your verification code for Password Reset is: <b> '+verifyCode+'</b></p><p>For any queries please reach us at <i>head.of.group.chat@gmail.com</i>'// plain text body
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info);
  });
  }

module.exports ={
    generateWelcomeMail : generateEmail,
    verificationCode : generateVerificationCode
}