import nodemailer from "nodemailer";
import dotenv from "dotenv"
dotenv.config();

const transporter=nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:587,
    secure: false,
    auth:{
        user:process.env.USER_EMAIL,
        pass:process.env.USER_PASSWORD,
    }
    })

    const sendEmail =async(to,subject,text)=>{
        try{
            await transporter.sendMail({
                from:process.env.EMAIL_FROM,
                to,
                subject,
                text,
                })
            console.log("Email sent successfully");
    
        }
        catch(error){
            console.error("Email sending error:", error);
            console.error(error);
            }
    }
   
export default sendEmail;














// uoch yxce tnjm zgpn