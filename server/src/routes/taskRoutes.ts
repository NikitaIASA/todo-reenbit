import express from 'express';

import { getUserTasks, createUserTask, editUserTask } from '../controllers/taskControllers';
import { checkAuth } from "../middlewares/checkAuth";
import { createUserTaskValidation, editUserTaskValidation } from '../validations/taskValidations';
import { handleValidationErrors } from '../middlewares/handleValidationErrors';

const tasksRouter = express.Router();

tasksRouter.get('/', checkAuth, getUserTasks);
tasksRouter.post('/', checkAuth, createUserTaskValidation, handleValidationErrors, createUserTask);
tasksRouter.put('/:taskId', checkAuth, editUserTaskValidation, handleValidationErrors, editUserTask);

export default tasksRouter;
