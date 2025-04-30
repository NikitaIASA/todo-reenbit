import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleAxiosError } from '@/helpers/handleAxiosError';
import { ITodoItem, IUserTasksResponse } from '@/types/todoItemDto';
import todoListApi from '@/core/api/todo-list/todo-list-api';

export const fetchUserTasks = createAsyncThunk<
    IUserTasksResponse,
    { search?: string; status?: string },
    { rejectValue: string }
>(
    'todos/fetchUserTasks',
    async ({ search = '', status = '' }, { rejectWithValue }) => {
        try {
            const tasks = await todoListApi.tasks.fetchTodos(search, status);
            return tasks;
        } catch (error) {
            const errorMessage = handleAxiosError(error);
            return rejectWithValue(errorMessage);
        }
    }
);

export const addUserTask = createAsyncThunk<
    ITodoItem,
    { title: string; createdDate: string; expiredDate: string },
    { rejectValue: string }
>(
    'todos/addUserTask',
    async (taskData, { rejectWithValue }) => {
        try {
            const task = await todoListApi.tasks.createTodo(taskData)
            return task;
        } catch (error) {
            const errorMessage = handleAxiosError(error);
            return rejectWithValue(errorMessage);
        }
    }
);

export const editTask = createAsyncThunk<
    ITodoItem,
    { taskId: string; taskData: Partial<{ title: string; createdDate: string; expiredDate: string; completed: boolean }> },
    { rejectValue: string }
>(
    'todos/editTask',
    async ({ taskId, taskData }, { rejectWithValue }) => {
        try {
            const updatedTask = await todoListApi.tasks.updateTodo(taskId, taskData);
            return updatedTask;
        } catch (error) {
            const errorMessage = handleAxiosError(error);
            return rejectWithValue(errorMessage);
        }
    }
);

export const deleteTask = createAsyncThunk<
    string,
    string,
    { rejectValue: string }
>(
    'todos/deleteTask',
    async (taskId, { rejectWithValue }) => {
        try {
            await todoListApi.tasks.deleteTodo(taskId);
            return taskId;
        } catch (error) {
            const errorMessage = handleAxiosError(error);
            return rejectWithValue(errorMessage);
        }
    }
);

export const deleteCompletedTasks = createAsyncThunk<
    void,
    void,
    { rejectValue: string }
>(
    'todos/deleteCompletedTasks',
    async (_, { rejectWithValue }) => {
        try {
            await todoListApi.tasks.deleteCompletedTodos();
        } catch (error) {
            const errorMessage = handleAxiosError(error);
            return rejectWithValue(errorMessage);
        }
    }
);