import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    createdDate: {
        type: String,
    },
    expiredDate: {
        type: String,
    },
    completed: {
        type: Boolean,
        default: false
    }
});

export const Task = mongoose.model('Task', taskSchema);
