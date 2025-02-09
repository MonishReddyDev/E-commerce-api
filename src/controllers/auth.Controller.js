import cookie from 'cookie';
import { registerUserService, userLoginService } from "../services/auth.service.js";
import asyncErrorHandler from '../utils/asyncErrorHandler.js';
import sendSuccessResponse from '../utils/responseHandler.js';
import { responseMessages } from '../utils/messages.js';



// Register user
export const registerUser = asyncErrorHandler(async (req, res) => {
    const { username, password, email, role } = req.body;

    // Await the service function
    const user = await registerUserService(username, password, email, role);

    // Success response
    sendSuccessResponse(res, 201, responseMessages.registerUser, {
        user: { id: user.id, email: user.email, username: user.username, role },
    });
});


//Login
export const loginUser = asyncErrorHandler(async (req, res) => {
    const { email, password } = req.body;
    const { user, token } = await userLoginService(email, password);
    res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600, // 1 hour
            path: '/'
        })
    );
    sendSuccessResponse(res, 200, responseMessages.loginUser, {
        user: { id: user.id, email: user.email, username: user.username },
    })
});


// Logout user
export const logoutUser = (req, res) => {
    const user = req.user
    res.setHeader('Set-Cookie', cookie.serialize('token', '', {
        maxAge: 0,
        path: '/'
    }));

    sendSuccessResponse(res, 200, responseMessages.logoutUser, {
        user: { id: user.id, email: user.email, username: user.username },
    })
};

