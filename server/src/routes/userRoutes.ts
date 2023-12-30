import express from 'express';
import { login } from '../controllers/userControllers';
import { handleValidationErrors } from '../middlewares/handleValidationErrors';

const usersRouter = express.Router();

usersRouter.post('/login', handleValidationErrors, login);

export default usersRouter;
