import express from 'express';

import { getUserTasks, createUserTask } from '../controllers/taskControllers';
import { checkAuth } from "../middlewares/checkAuth";
import { createUserTaskValidation } from '../validations/taskValidations';
import { handleValidationErrors } from '../middlewares/handleValidationErrors';

const tasksRouter = express.Router();

tasksRouter.get('/', checkAuth, getUserTasks);
tasksRouter.post('/', checkAuth, createUserTaskValidation, handleValidationErrors, createUserTask);

export default tasksRouter;
