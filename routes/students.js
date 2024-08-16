import express from "express";
import { studentController } from "../controllers/index.js";
const router = express.Router();

router.get("/", studentController.getList);

router.get("/:id", studentController.getDetail);

router.post("/", studentController.create);

router.patch("/", studentController.getDetail);

export default router;