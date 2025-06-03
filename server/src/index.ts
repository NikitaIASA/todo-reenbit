import './otel';

import express, { Request, Response, Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from './routes/userRoutes';
import tasksRoutes from './routes/taskRoutes';

dotenv.config();

const { DB_URL, PORT = 8000 } = process.env;

if (!DB_URL) {
    console.log("DB URL is not defined");
    process.exit(1);
}

// DB connection
mongoose
    .connect(DB_URL)
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app: Application = express();
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello world');
});

app.use('/api/users', userRoutes);
app.use('/api/tasks', tasksRoutes)

app.listen(PORT, () => {
    console.log(`Server OK, running on port ${PORT}`);
});
