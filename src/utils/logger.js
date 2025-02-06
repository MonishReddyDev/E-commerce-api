import { createLogger, format, transports } from "winston";
const { combine, timestamp, json, printf } = format;

// Custom format for file logging (pretty-printed JSON)
const fileLogFormat = combine(
    timestamp(),
    printf(({ level, message, timestamp, ...rest }) => {
        const restString = Object.keys(rest).length ? JSON.stringify(rest, null, 2) : "";
        return `${timestamp} [${level}]: ${message} ${restString}`;
    })
);


// Custom format for console logging with colors
const consoleLogFormat = format.combine(
    format.colorize(),
    format.printf(({ level, message, timestamp }) => {
        return `${level}: ${message}`;
    })
);


// Create a Winston logger with separate transports for info and error
const logger = createLogger({
    level: "info",
    format: combine(timestamp(), json()),
    transports: [
        new transports.Console({
            format: consoleLogFormat,
        }),
        new transports.File({
            filename: "logs/info.log",
            level: "info", // Only log info level and higher
            format: fileLogFormat,
            // silent: (info) => info.level === "error",
        }),
        // Error log transport
        new transports.File({
            filename: "logs/error.log",
            level: "error", // Only log error level and higher
            format: fileLogFormat,
        }),
    ],
});


export default logger;