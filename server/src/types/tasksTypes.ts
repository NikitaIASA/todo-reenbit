import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface UserPayload extends JwtPayload {
    userId: string;
}

export interface AuthRequest extends Request {
    user?: UserPayload;
}
