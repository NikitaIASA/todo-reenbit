import { param, body } from 'express-validator';

export const createUserTaskValidation = [
    body('title').notEmpty().withMessage('Title is required'),
    body('createdDate').notEmpty().withMessage('Created date is required'),
    body('expiredDate').notEmpty().withMessage('Expired date is required')
];


export const editUserTaskValidation = [
    param('taskId').isMongoId().withMessage('Invalid task ID'),

    body('title').optional(),
    body('createdDate').optional(),
    body('expiredDate').optional(),
    body('completed').optional(),
];
