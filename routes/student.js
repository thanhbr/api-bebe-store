import express from "express";
import { studentController } from "../controllers/index.js";
const router = express.Router();

router.get("/", studentController.getList);

router.post("/", studentController.create);

router.get("/:id", studentController.getDetail);

router.patch("/:id", studentController.update);

// router.post("/fake", studentController.generateFakeStudents);

export default router;