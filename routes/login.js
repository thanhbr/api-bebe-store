import express from "express";
import { body } from "express-validator";
import { userController } from "../controllers/index.js";


const router = express.Router();

router.post("/", 
    body("email").isEmail(),
    body("password").isLength({ min: 5 })
    , userController.login);

export default router;