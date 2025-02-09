import Joi from "joi";

// Define validation schema
export const registerSchema = Joi.object({
    username: Joi.string().min(3).max(30).regex(/^[A-Za-z]+$/).
        required().messages({
            "string.base": "username must be a string",
            "string.empty": "username is required",
            "string.pattern.base": "Invlaid unsername format",
            "string.min": "username must be at least 3 characters long",
            "string.max": "username cannot exceed 30 characters",
            "any.required": "username is required",
        }),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .regex(/^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com)$/)
        .required().messages({
            "string.email": "Invalid email format",
            "string.empty": "Email is required",
            "string.pattern.base": "invalid email",
            "any.required": "Email is required",
        }),
    password: Joi.string()
        .min(8)
        .max(20)
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"))
        .required()
        .messages({
            "string.min": "Password must be at least 8 characters long",
            "string.max": "Password cannot exceed 20 characters",
            "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
            "string.empty": "Password is required",
            "any.required": "Password is required",
        }),
    role: Joi.string()
        .valid('admin', 'user', 'guest') // Validates that the role is one of the three specified
    // .required()
});




