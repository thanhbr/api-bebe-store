import express from "express";
import { brandController } from "../controllers/index.js";


const router = express.Router();

router.get("/", brandController.getList);
router.get("/:id", brandController.getDetail);
router.post("/", brandController.create);

export default router;