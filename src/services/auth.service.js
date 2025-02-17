import User from "../models/user.model.js";
import { CustomError } from "../utils/customeError.js";
import { ERROR_MESSAGES } from "../utils/messages.js";
import { generateToken } from "../utils/token.js";




export const registerUserService = async (username, password, email, role) => {

    const userExists = await User.findOne({ email });

    if (userExists) {
        throw new CustomError(ERROR_MESSAGES.USER_EXISTS, 400);
    }

    const user = new User({ username, password, email, role });

    await user.save();

    return user;
};


export const userLoginService = async (email, password) => {

    // Basic validation
    if (!email || !password) throw new CustomError(ERROR_MESSAGES.MISSING_FIELDS, 400);

    // Find the user by email.
    const user = await User.findOne({ email });

    if (!user) throw new CustomError(ERROR_MESSAGES.USER_NOT_FOUND, 404);

    // Check if the provided password matches.
    const isMatch = await user.matchPassword(password);

    if (!isMatch) throw new CustomError(ERROR_MESSAGES.INVALID_CREDENTIALS, 400);

    // Generate a JWT token.
    const token = generateToken({ id: user._id, role: user.role, email: user.email });

    return { user, token };
};

