import logger from "../utils/logger.js";



// middleware/globalErrorHandler.js
const globalErrorHandler = (err, req, res, next) => {

    // Use This for more logg info 
    const logMessage = `
    Error occurred:
    - Message: ${err.message}
    - Status Code: ${err.statuscode || 500}
    - HTTP Method: ${req.method}
    - URL: ${req.originalUrl}
    ${process.env.NODE_ENV === "development" ? `- Stack Trace: ${err.stack}` : ""}
    `;

    // const logMessage = err.message
    logger.error(logMessage)

    //This sent as a API error response 
    const statusCode = err.statusCode || 500;
    const errorResponse = {
        status: statusCode < 500 ? 'fail' : 'error',
        message: err.message || 'Internal Server Error',
        // Optionally include errorCode or stack trace in development:
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    };

    res.status(statusCode).json(errorResponse);
};

export default globalErrorHandler;
