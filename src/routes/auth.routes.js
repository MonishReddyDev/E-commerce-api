import express from 'express';
import authenticateJWT from '../middleware/auth.middleware.js';
import { validateUserRegistration } from '../middleware/validateRequest.middleware.js';
import { registerUser, loginUser, logoutUser } from '../controllers/auth.Controller.js';



const router = express.Router();

router.post('/register', validateUserRegistration, registerUser);
router.post('/login', loginUser);
router.post('/logout', authenticateJWT, logoutUser);


// Protected route
router.get('/profile', authenticateJWT, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

export default router;
