import { transporter } from "../config/email.Config.js";
import logger from "../utils/logger.js"
import { CustomError } from "./CustomeError.js";


const sendMail = async (to, subject, message) => {
    try {
        const email = await transporter.sendMail({
            to,
            subject,
            html: message
        })

        if (!email) throw CustomError("Error sending email")

        logger.info("Email sent successfully!")

    } catch (error) {
        logger.error("Error while sending email:", error);
        throw error;

    }

}

export default sendMail