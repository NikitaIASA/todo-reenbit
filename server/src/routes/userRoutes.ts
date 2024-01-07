import express from 'express';
import { login, refreshToken, register } from '../controllers/userControllers';
import { handleValidationErrors } from '../middlewares/handleValidationErrors';

const usersRouter = express.Router();

usersRouter.post('/register', handleValidationErrors, register)
usersRouter.post('/login', handleValidationErrors, login);
usersRouter.post('/refresh', handleValidationErrors, refreshToken);

export default usersRouter;
