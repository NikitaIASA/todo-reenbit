import express from 'express';
import { login, refreshToken } from '../controllers/userControllers';
import { handleValidationErrors } from '../middlewares/handleValidationErrors';

const usersRouter = express.Router();

usersRouter.post('/login', handleValidationErrors, login);
usersRouter.post('/refresh', handleValidationErrors, refreshToken);

export default usersRouter;
