import express from "express";
import { userController } from "../controllers/index.js";


const router = express.Router();

router.get("/", userController.getList);

router.get("/:id", userController.getDetail);

export default router;