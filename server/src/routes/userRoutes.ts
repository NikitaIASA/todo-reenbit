import express from 'express';
import { login } from '../controllers/userControllers';

const usersRouter = express.Router();

usersRouter.post('/login', login);

export default usersRouter;
