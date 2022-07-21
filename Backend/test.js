var nodemailer = require('nodemailer')

var transport = nodemailer.createTransport(
    {
        service : 'gmail',
        secure:false,
        auth : {
            user : 'varshneyyaman766@gmail.com',
            pass:'lzeuyztcfbaulmla'
        },
        tls:{
            rejectUnauthorized:false
        }
    }
);


var mailOptions = {
    from : 'varshneyyaman766@gmail.com',
    to : 'varshubham766@gmail.com',
    subject : 'Hello world this is a test mail',
    text : 'This is the body'
}

transport.sendMail(mailOptions,function(error,info){
    if(error){
        console.log(error)
    }else{
        console.log("Email sent" + info.response)
    }
})