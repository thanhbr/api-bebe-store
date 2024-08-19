import express from 'express';
import loginRouter from "./login.js";
import registerRouter from "./register.js";
import userRouter from './users.js';
import studentRouter from './students.js';
import brandRouter from './brands.js';
import checkToken from '../authentication/auth.js';
import { PATH } from '../global/path.js';

const router = express.Router();

router.use(express.json());
router.use(checkToken);

router.use(PATH.LOGIN, loginRouter);
router.use(PATH.REGISTER, registerRouter)
router.use(PATH.USERS, userRouter);
router.use(PATH.STUDENTS, studentRouter);
router.use("/brands", brandRouter);

export default router;