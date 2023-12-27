import { Response } from 'express';

import { Task } from '../models/task';
import { AuthRequest } from '../types/tasksTypes';

export const getUserTasks = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user || !req.user.userId) {
            return res.status(400).json({ message: "User ID is missing" });
        }

        const userId = req.user.userId;
        const tasks = await Task.find({ userId }).select('-userId'); 

        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to get user's tasks" });
    }
};
