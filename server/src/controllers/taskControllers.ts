import { Response } from 'express';

import { Task } from '../models/task';
import { AuthAddRequest, AuthRequest } from '../types/tasksTypes';

export const getUserTasks = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user || !req.user.userId) {
            return res.status(400).json({ message: "User ID is missing" });
        }

        const userId = req.user.userId;
        const tasks = await Task.find({ userId }).sort({ _id: -1 });

        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to get user's tasks" });
    }
};

export const createUserTask = async (req: AuthAddRequest, res: Response) => {
    try {
        
        if (!req.user || !req.user.userId) {
            return res.status(400).json({ message: "User ID is missing" });
        }

        const userId = req.user.userId;
        const { title, createdDate, expiredDate } = req.body;

        const newTask = new Task({
            userId,
            title,
            createdDate,
            expiredDate,
            completed: false
        });

        await newTask.save();
        
        const taskObject = newTask.toObject();
        delete taskObject.userId;

        res.status(201).json(taskObject);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to add a task" });
    }
};
