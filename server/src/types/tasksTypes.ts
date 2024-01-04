import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface UserPayload extends JwtPayload {
    userId: string;
}

export interface AuthRequest extends Request {
    user?: UserPayload;
}

export interface AuthAddRequest extends Request {
    user?: UserPayload;
    body: {
        title: string;
        createdDate: string;
        expiredDate: string;
    };
}

export interface EditTaskRequest extends Request {
    user?: UserPayload; 
    body: {
        title?: string;
        createdDate?: string;
        expiredDate?: string;
        completed?: boolean;
    };
    params: {
        taskId: string; 
    };
}
