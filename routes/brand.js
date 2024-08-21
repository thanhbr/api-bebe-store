import express from "express";
import { brandController } from "../controllers/index.js";


const router = express.Router();

router.get("/", brandController.getList);
router.post("/", brandController.create);
router.get("/:id", brandController.getDetail);
router.patch("/:id", brandController.update);
router.delete("/:id", brandController.deleteBrand);

export default router;