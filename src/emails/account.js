const sgMail=  require('@sendgrid/mail')
sgMail.setApiKey(process.env.sendGridApikey)

const sendWelcomeMail=(email,name)=>{
    console.log('INside welcomme',email)

sgMail.send({
    to:email,
    from:'ratanupadhyay6835@gmail.com',
    subject:`Welcome ${name} to the chat-box `,
    text:`Hello ${name} hope you are doing well` 
})
}

const sendCancellationMail=(email,name)=>{
    console.log('INside cancel',email)
    sgMail.send({
        from:'ratanupadhyay6835@gmail.com',
        to:email,
        subject:'Account deleted',
        text:`Your account is deleted . Hope to see you soon ${name}`
    })
}
 
//send otp to email
const sendOtpToMail= (email,name)=>{

    try{
        const otp=generateOTP();
        console.log("Otp is",otp)
        sgMail.send({
            from:"ratanupadhyay6835@gmail.com",
            to:email,
            cc:'ratanupadhyay6836@gmail.com',
            subject:"Otp for login",
            text:`Hello ${name} , Your otp for login is ${otp}`
        })
        return otp;
    }
    catch(e){
        throw new Error(e)
    }

}

const generateOTP=()=> { 
    var digits = '0123456789'; 
    let OTP = ''; 
    for (let i = 0; i < 4; i++ ) { 
        OTP += digits[Math.floor(Math.random() * 10)]; 
    } 
    return OTP; 
}

module.exports={
    sendWelcomeMail,
    sendOtpToMail
}