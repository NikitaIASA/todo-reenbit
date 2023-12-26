import express from 'express';

import { getUserTasks } from '../controllers/taskControllers';
import { checkAuth } from "../middlewares/checkAuth";

const tasksRouter = express.Router();

tasksRouter.get('/', checkAuth, getUserTasks);

export default tasksRouter;
