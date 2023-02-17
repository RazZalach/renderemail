const nodemailer = require('nodemailer');
module.exports={
    SendEmail:(to,body)=>{

   let result = `<div><h1> ברוך הבא המנהל ירון</h1><br /><p>שם מלא:${body.fullname} </p><br /><p>טלפון:${body.phone} </p><br /><p>כתובת המייל: ${to} </p><br /> <p> תוכן ההודעה: ${body.content}</p></div>`;
        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user:process.env.EMAIL,
                pass:process.env.PASSEMAIL
            }
        });
         
        let mailDetails = {
            from: process.env.EMAIL,
            to,
            html: result
        };
        console.log(mailDetails);
        mailTransporter.sendMail(mailDetails, function(err, data) {
            if(err) {
                console.log(err.message);
            } else {
                console.log('Email sent successfully');
            }
        });
    }

}