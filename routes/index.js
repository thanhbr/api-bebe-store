import express from 'express';
import userRouter from './users.js';
import studentRouter from './students.js';
import checkToken from '../authentication/auth.js';

const router = express.Router();

router.use(express.json());
router.use(checkToken);

router.use('/users', userRouter);
router.use('/students', studentRouter);

export default router;