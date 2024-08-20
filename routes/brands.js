import express from "express";
import { brandController } from "../controllers/index.js";


const router = express.Router();

router.post("/", brandController.create);

export default router;