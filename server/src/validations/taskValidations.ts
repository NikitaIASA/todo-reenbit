import { body } from 'express-validator';

export const createUserTaskValidation = [
    body('title').notEmpty().withMessage('Title is required'),
    body('createdDate').notEmpty().withMessage('Created date is required'),
    body('expiredDate').notEmpty().withMessage('Expired date is required')
];
