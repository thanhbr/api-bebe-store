import express from "express";
import { categoryController } from "../controllers/index.js";


const router = express.Router();

router.get("/", categoryController.getList);
router.post("/", categoryController.create);
router.get("/:id", categoryController.getDetail);

export default router;