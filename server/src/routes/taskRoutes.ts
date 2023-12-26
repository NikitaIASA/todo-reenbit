import express from 'express';

import { getUserTasks, createTask } from '../controllers/taskControllers';
import { checkAuth } from "../middlewares/checkAuth";

const tasksRouter = express.Router();

tasksRouter.get('/', checkAuth, getUserTasks);
tasksRouter.post('/', checkAuth, createTask);

export default tasksRouter;