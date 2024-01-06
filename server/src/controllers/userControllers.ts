import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

import { User } from '../models/user';

const { JWT_SECRET } = process.env;

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !await bcrypt.compare(password, user.password)) {
            res.status(401).send("Email/Password mismatch");
            return;
        }

        const accessToken = jwt.sign({ userId: user._id }, "secretcode111", { expiresIn: '1m' });
        const refreshToken = jwt.sign({ userId: user._id }, "secretcode111", { expiresIn: '2m' });

        user.refreshToken = refreshToken;
        await user.save();

        res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
        res.status(500).send("Something went wrong...");
    }
};

export const refreshToken = async (req: Request, res: Response): Promise<void> => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        res.status(401).send("Refresh Token is required");
        return;
    }

    try {
        const decoded = jwt.verify(refreshToken, "secretcode111") as JwtPayload;
        const user = await User.findOne({ _id: decoded.userId, refreshToken });

        if (!user) {
            res.status(403).send("Invalid refresh token");
            return;
        }

        const newAccessToken = jwt.sign({ userId: user._id }, "secretcode111", { expiresIn: '1m' });
        res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
        res.status(403).send("Invalid or expired refresh token");
    }
};
