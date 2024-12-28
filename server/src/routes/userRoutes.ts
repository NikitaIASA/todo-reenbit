import express from 'express';
import { changePassword, getUserProfile, login, refreshToken, register } from '../controllers/userControllers';
import { handleValidationErrors } from '../middlewares/handleValidationErrors';
import { checkAuth } from '../middlewares/checkAuth';

const usersRouter = express.Router();

usersRouter.post('/register', handleValidationErrors, register)
usersRouter.post('/login', handleValidationErrors, login);
usersRouter.post('/refresh', handleValidationErrors, refreshToken);
usersRouter.get('/profile', checkAuth, handleValidationErrors, getUserProfile);
usersRouter.post('/change-password', checkAuth, changePassword);

export default usersRouter;
