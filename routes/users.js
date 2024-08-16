import express from "express";
import { body } from "express-validator";
import { userController } from "../controllers/index.js";


const router = express.Router();

router.post("/login", 
    body("email").isEmail(),
    body("password").isLength({ min: 5 })
    ,
    userController.login);

router.post("/register", userController.register);

router.get("/", userController.getList);

router.get("/:id", userController.getDetail);

export default router;