import nodemailer from "nodemailer"


export const transporter = nodemailer.createTransport({
    secure: true,
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASSWORD
    }
})