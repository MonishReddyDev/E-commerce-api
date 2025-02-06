// utils/token.js
import jwt from 'jsonwebtoken';
import env from "../utils/env_valriables.js"

export const generateToken = (payload, expiresIn = '1h') => {
    return jwt.sign(payload, env.jwtSecret, { expiresIn });
};
