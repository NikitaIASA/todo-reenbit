import { Dispatch } from 'redux';

import {
    fetchTasksRequest, fetchTasksSuccess,
    fetchTasksFailure, addTaskFailure, addTaskRequest,
    addTaskSuccess, editTaskRequest, editTaskSuccess,
    editTaskFailure, deleteTaskRequest, deleteTaskSuccess,
    deleteTaskFailure, deleteCompletedTasksRequest,
    deleteCompletedTasksSuccess, deleteCompletedTasksFailure
} from "@/redux/actions/todoActions";
import api from "@/core/api";
import { handleAxiosError } from '@/helpers/handleAxiosError';

export const fetchUserTasks = (search = '', status = '') => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchTasksRequest());
        try {
            const { data } = await api.get(`/tasks?status=${status}&search=${search}`);
            dispatch(fetchTasksSuccess(data));
        } catch (error) {
            const errorMessage = handleAxiosError(error);
            dispatch(fetchTasksFailure(errorMessage));
        }
    };
};

export const addUserTask = (taskData: { title: string; createdDate: string; expiredDate: string }) => {
    return async (dispatch: Dispatch) => {
        dispatch(addTaskRequest());
        try {
            const { data } = await api.post('/tasks', taskData);
            dispatch(addTaskSuccess(data));
        } catch (error) {
            const errorMessage = handleAxiosError(error);
            dispatch(addTaskFailure(errorMessage));
        }
    };
};

export const editTask = (taskId: string, taskData: { title?: string; createdDate?: string; expiredDate?: string, completed?: boolean }) => {
    return async (dispatch: Dispatch) => {
        dispatch(editTaskRequest());
        try {
            const { data } = await api.put(`/tasks/${taskId}`, taskData);
            dispatch(editTaskSuccess(data));
        } catch (error) {
            const errorMessage = handleAxiosError(error);
            dispatch(editTaskFailure(errorMessage));
        }
    };
};

export const deleteTask = (taskId: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(deleteTaskRequest());
        try {
            await api.delete(`/tasks/${taskId}`);
            dispatch(deleteTaskSuccess(taskId));
        } catch (error) {
            const errorMessage = handleAxiosError(error);
            dispatch(deleteTaskFailure(errorMessage));
        }
    };
};

export const deleteCompletedTasks = () => {
    return async (dispatch: Dispatch) => {
        dispatch(deleteCompletedTasksRequest());
        try {
            await api.delete('/tasks/completed');
            dispatch(deleteCompletedTasksSuccess());
        } catch (error) {
            const errorMessage = handleAxiosError(error);
            dispatch(deleteCompletedTasksFailure(errorMessage));
        }
    };
};
