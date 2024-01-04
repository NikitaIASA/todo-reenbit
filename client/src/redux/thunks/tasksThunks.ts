import { Dispatch } from 'redux';

import { fetchTasksRequest, fetchTasksSuccess, fetchTasksFailure, addTaskFailure, addTaskRequest, addTaskSuccess, editTaskRequest, editTaskSuccess, editTaskFailure } from "@/redux/actions/todoActions";
import api from "@/core/api";
import { handleAxiosError } from '@/helpers/handleAxiosError';

export const fetchUserTasks = () => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchTasksRequest());
        try {
            const { data } = await api.get('/tasks');
            const tasks = data;
            dispatch(fetchTasksSuccess(tasks));
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
