import express from 'express';
import { login } from '../controllers/userControllers';

const router = express.Router();

router.post('/login', login);

export default router;
