const sgMail=  require('@sendgrid/mail')
sgMail.setApiKey(process.env.sendGridApikey)
 
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
    sendOtpToMail
}