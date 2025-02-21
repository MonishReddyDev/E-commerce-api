
import express from "express"
import authenticateJWT from "../middleware/auth.middleware.js"
import { submitFeedback } from "../controllers/feedBack.Controller.js"


const Router = express.Router()



Router.post("/submit", authenticateJWT, submitFeedback)


export default Router