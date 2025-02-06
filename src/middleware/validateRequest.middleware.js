import { registerSchema } from "../validators/authValidator.js";


// Middleware function
export const validateUserRegistration = (req, res, next) => {
    const { error } = registerSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            status: "error",
            errors: error.details.map((err) => ({
                field: err.path[0],
                message: err.message,
            })),
        });
    }

    next();
};


