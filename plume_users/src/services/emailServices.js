let nodemailer = require('nodemailer');
const User = require('../models/users');
const cryptoJS = require('crypto-js');
const dotenv = require("dotenv").config();


const sendMailToUser = async (receiver, subject, emailBody) =>{
    //const receiver = await User.findById(receiverId);
    let transporter = nodemailer.createTransport({
      service: 'gmail',
    //   host: "smtp.gmail.com",
    //   port: 587,
    //   ignoreTLS: false,
    //   secure: false,
      auth: {
        user: process.env.ADMIN_MAIL,
        pass: process.env.APP_PASS,
      },
    });
    let mailOptions = {
        from: process.env.ADMIN_MAIL,
        to: receiver.email,
        subject: subject,
        text: emailBody
        //html: `<h4>Bonjour ${receiver.firstName},</h4></br><h5>${sender.firstName} vous a écrit dépuis la plateforme MCF et repond à l'adresse suivante: ${sender.email} </h5><p>--------------------------------------------------------------------------------------------------</p><p>${emailBody}</p>`
    };
    transporter.sendMail(mailOptions, (error, info) =>{
        if(error){
            console.log(error);
        }
        else{
            console.log("Email sent: "+info.response);
            return info;
        }
    });
    
}

const sendCredentialToUser = async (receiverId, password) =>{
    const receiver = await User.findById(receiverId);
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.ADMIN_MAIL,
            pass: process.env.APP_PASS
        }
    });
    const subject = 'Enregistrement sur MCF';
    let mailOptions = {
        from: process.env.ADMIN_MAIL,
        to: receiver.email,
        subject: subject,
        //text: emailBody
        html: `<p>Hello, j'espère que tu vas bien !</br>

        C'est le jour J et nous avons tous très hâte que tu démarres ta formation 🙂
        Comme prévu, nous te retrouvons sur le site de WAB-LMS (https://wab-lms.com). 
        Pour te connecter, utilise les codes suivants :<p>
        <p>Identifiant :<strong>${receiver.email}</strong></p><p>Mot de passe :<strong>${password}</strong></p>
        <p>Tu pourras alors accéder à l'intégralité du contenu de ta formation.
        Nous sommes à ton entière disposition pour répondre à tes questions, éventuellement sur l'accès et/ou l'utilisation de la plateforme par ce mail alors n'hésite pas 🙂
        Toute l'équipe te souhaite une excellente formation, nous avons hâte de te voir évoluer !</p></br>
        
        <p>À très vite 😀 </p>`
        
        // `<h3>Bonjour ${receiver.firstName}, Bienvenue dans la meilleur plateforme de formation en ligne Mon Centre de Formation.</h3><h4> Vos identifiants pour vous connecter sont les suivants: </h4></br><p>--------------------------------------------------------------------------------------------------</p>
        // <p>Email: ${receiver.email}, Mot de Pass: ${password}. </br>Nous vous souhaitons une très bonne formation.</p>`
    };
    transporter.sendMail(mailOptions, (error, info) =>{
        if(error){
            console.log(error);
        }
        else{
            console.log("Email sent: "+info.response);
            return info;
        }
    });
    
}

const recorverPassword = async (email) =>{
    const receiver = await User.findOne({email: email});
    if(!receiver){
        throw new ApiError(httpStatus.NOT_FOUND, 'Email not found');
    }
    else{

        const hashedPass = cryptoJS.AES.decrypt(
            receiver.password,
            process.env.PASS_SEC
        );
        const password = hashedPass.toString(cryptoJS.enc.Utf8);

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.ADMIN_MAIL,
                pass: process.env.APP_PASS
            }
        });
        const subject = 'Mot de passe sur MCF';
        let mailOptions = {
            from: process.env.ADMIN_MAIL,
            to: receiver.email,
            subject: subject,
            //text: emailBody
            html: `<p>Hello, j'espère que tu vas bien !</br>
    
            Nous avons tous très hâte que tu continues ta formation 🙂
            Nous te retrouvons sur le site de WAB-LMS (https://wab-lms.com). 
            Pour te connecter, utilise les codes suivants :<p>
            <p>Identifiant :<strong>${receiver.email}</strong></p><p>Mot de passe :<strong>${password}</strong></p>
            <p>Tu pourras alors accéder à l'intégralité du contenu de ta formation.
            Nous sommes à ton entière disposition pour répondre à tes questions, éventuellement sur l'accès et/ou l'utilisation de la plateforme par ce mail alors n'hésite pas 🙂
            Toute l'équipe te souhaite une excellente formation, nous avons hâte de te voir évoluer !</p></br>
            
            <p>À très vite 😀 </p>`
            
            // `<h3>Bonjour ${receiver.firstName}, Bienvenue dans la meilleur plateforme de formation en ligne Mon Centre de Formation.</h3><h4> Vos identifiants pour vous connecter sont les suivants: </h4></br><p>--------------------------------------------------------------------------------------------------</p>
            // <p>Email: ${receiver.email}, Mot de Pass: ${password}. </br>Nous vous souhaitons une très bonne formation.</p>`
        };
        transporter.sendMail(mailOptions, (error, info) =>{
            if(error){
                console.log(error);
            }
            else{
                console.log("Email sent: "+info.response);
                return info;
            }
        });
    }
    
    
}

module.exports ={
    sendMailToUser,
    sendCredentialToUser,
    recorverPassword
}

