import { transporter } from "../config/emailConfig.js";
import asyncErrorHandler from "./asyncErrorHandler.js";
import logger from "../utils/logger.js"
import { CustomError } from "./CustomeError.js";


const sendMail = asyncErrorHandler(async (to, subject, message) => {
    const email = await transporter.sendMail({
        to,
        subject,
        html: message
    })

    if (!email) throw CustomError("Error sending email")

    logger.info("Email sent successfully!")

})

export default sendMail