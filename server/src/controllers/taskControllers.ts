import { Response } from 'express';

import { Task } from '../models/task';
import { AddTaskRequest, AuthRequest, DeleteCompletedTasksRequest, DeleteTaskRequest, EditTaskRequest } from '../types/tasksTypes';

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

export const createUserTask = async (req: AddTaskRequest, res: Response) => {
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

export const editUserTask = async (req: EditTaskRequest, res: Response) => {
    try {
        if (!req.user || !req.user.userId) {
            return res.status(400).json({ message: "User ID is missing" });
        }

        const userId = req.user.userId;
        const taskId = req.params.taskId;
        const { title, createdDate, expiredDate, completed } = req.body;

        const updatedTask = await Task.findOneAndUpdate(
            { _id: taskId, userId },
            { title, createdDate, expiredDate, completed },
            { new: true, runValidators: true } 
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found or user unauthorized to edit" });
        }

        const taskObject = updatedTask.toObject();
        delete taskObject.userId;

        res.status(200).json(taskObject);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to edit task" });
    }
};

export const deleteUserTask = async (req: DeleteTaskRequest, res: Response) => {
    try {
        if (!req.user || !req.user.userId) {
            return res.status(400).json({ message: "User ID is missing" });
        }

        const userId = req.user.userId;
        const taskId = req.params.taskId;

        const task = await Task.findOneAndDelete({ _id: taskId, userId });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task successfully deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete task" });
    }
};

export const deleteUserCompletedTasks = async (req: DeleteCompletedTasksRequest, res: Response) => {
    try {
        if (!req.user || !req.user.userId) {
            return res.status(400).json({ message: "User ID is missing" });
        }

        const userId = req.user.userId;

        await Task.deleteMany({ userId, completed: true });

        res.status(200).json({ message: "Completed tasks successfully deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete completed tasks" });
    }
};
