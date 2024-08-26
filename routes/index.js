import express from "express";
import loginRouter from "./login.js";
import registerRouter from "./register.js";
import userRouter from "./user.js";
import studentRouter from "./student.js";
import brandRouter from "./brand.js";
import categoryRouter from "./category.js";
import checkToken from "../authentication/auth.js";
import { PATH } from "../global/path.js";

const router = express.Router();

router.use(express.json());
router.use(checkToken);

router.use(PATH.LOGIN, loginRouter);
router.use(PATH.REGISTER, registerRouter);
router.use(PATH.USERS, userRouter);
router.use(PATH.STUDENTS, studentRouter);
router.use(PATH.BRANDS, brandRouter);
router.use(PATH.CATEGORIES, categoryRouter);

export default router;
