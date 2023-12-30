import { Dispatch } from 'redux';

import { fetchTasksRequest, fetchTasksSuccess, fetchTasksFailure, addTaskFailure, addTaskRequest, addTaskSuccess, editTaskRequest, editTaskSuccess, editTaskFailure, deleteTaskRequest, deleteTaskSuccess, deleteTaskFailure } from "@/redux/actions/todoActions";
import api from "@/core/api";

export const fetchUserTasks = () => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchTasksRequest());
        try {
            const { data } = await api.get('/tasks');
            const tasks = data;
            dispatch(fetchTasksSuccess(tasks));
        } catch (error: any) {
            dispatch(fetchTasksFailure(error.response?.data || 'Unknown error'));
        }
    };
};

export const addUserTask = (taskData: { title: string; createdDate: string; expiredDate: string }) => {
    return async (dispatch: Dispatch) => {
        dispatch(addTaskRequest());
        try {
            const { data } = await api.post('/tasks', taskData);
            dispatch(addTaskSuccess(data));
        } catch (error: any) {
            dispatch(addTaskFailure(error.response?.data || 'Unknown error'));
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
            dispatch(editTaskFailure(error.response?.data || 'Error editing task'));
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
            dispatch(deleteTaskFailure(error.response?.data || 'Error deleting task'));
        }
    };
};
