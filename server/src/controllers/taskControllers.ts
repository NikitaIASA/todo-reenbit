import { Request, Response } from 'express';

import { Task } from '../models/task';

export const getUserTasks = async (req: Request, res: Response) => {
    try {
        const userId = req.body.userId;
        const tasks = await Task.find({ userId });

        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to get user's tasks" });
    }
};
