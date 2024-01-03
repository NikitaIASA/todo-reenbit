import { Dispatch } from 'redux';

import { fetchTasksRequest, fetchTasksSuccess, fetchTasksFailure, addTaskFailure, addTaskRequest, addTaskSuccess } from "@/redux/actions/todoActions";
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
