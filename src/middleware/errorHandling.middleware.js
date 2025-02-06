import logger from "../utils/logger.js";



// middleware/globalErrorHandler.js
const globalErrorHandler = (err, req, res, next) => {

    logger.error(err)
    // Set default values
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
