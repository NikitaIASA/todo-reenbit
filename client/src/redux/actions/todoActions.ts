import { ISetFilterAction, ISetSearchQueryAction, ITodoItem } from "@/types/todoItemDto";
import { actionTypes } from "@/types/actionTypes";

export const deleteCompletedTodos = () => ({
    type: actionTypes.DELETE_COMPLETED
});

export const fetchTasksRequest = () => ({
    type: actionTypes.FETCH_TASKS_REQUEST,
});

export const fetchTasksSuccess = (tasks: ITodoItem[]) => ({
    type: actionTypes.FETCH_TASKS_SUCCESS,
    payload: tasks,
});

export const fetchTasksFailure = (error: string) => ({
    type: actionTypes.FETCH_TASKS_FAILURE,
    payload: error,
});

export const addTaskRequest = () => ({
    type: actionTypes.ADD_TASK_REQUEST
});

export const addTaskSuccess = (task: ITodoItem) => ({
    type: actionTypes.ADD_TASK_SUCCESS,
    payload: task
});

export const addTaskFailure = (error: string) => ({
    type: actionTypes.ADD_TASK_FAILURE,
    payload: error
});

export const editTaskRequest = () => ({
    type: actionTypes.EDIT_TASK_REQUEST
});

export const editTaskSuccess = (task: ITodoItem) => ({
    type: actionTypes.EDIT_TASK_SUCCESS,
    payload: task
});

export const editTaskFailure = (error: string) => ({
    type: actionTypes.EDIT_TASK_FAILURE,
    payload: error
});

export const deleteTaskRequest = () => ({
    type: actionTypes.DELETE_TASK_REQUEST
});

export const deleteTaskSuccess = (taskId: string) => ({
    type: actionTypes.DELETE_TASK_SUCCESS,
    payload: taskId
});

export const deleteTaskFailure = (error: string) => ({
    type: actionTypes.DELETE_TASK_FAILURE,
    payload: error
});

export const deleteCompletedTasksRequest = () => ({
    type: actionTypes.DELETE_COMPLETED_TASKS_REQUEST
});

export const deleteCompletedTasksSuccess = () => ({
    type: actionTypes.DELETE_COMPLETED_TASKS_SUCCESS
});

export const deleteCompletedTasksFailure = (error: string) => ({
    type: actionTypes.DELETE_COMPLETED_TASKS_FAILURE,
    payload: error
});

export const setSearchQuery = (query: string): ISetSearchQueryAction => ({
    type: actionTypes.SET_SEARCH_QUERY,
    payload: query
});

export const setFilter = (filter: string): ISetFilterAction => ({
    type: actionTypes.SET_FILTER,
    payload: filter
});
