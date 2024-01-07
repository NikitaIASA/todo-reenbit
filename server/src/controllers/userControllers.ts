import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

import { User } from '../models/user';

const { JWT_SECRET } = process.env;

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            res.status(400).send("Passwords do not match");
            return;
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).send("Email already in use");
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        const accessToken = jwt.sign({ userId: newUser._id }, "secretcode111", { expiresIn: '1m' });
        const refreshToken = jwt.sign({ userId: newUser._id }, "secretcode111", { expiresIn: '2m' });

        newUser.refreshToken = refreshToken;
        await newUser.save();

        res.status(201).json({
            username: newUser.username,
            email: newUser.email,
            accessToken,
            refreshToken
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong...");
    }
};

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
