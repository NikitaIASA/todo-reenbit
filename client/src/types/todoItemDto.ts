import { actionTypes } from "./actionTypes";

export interface TodoType {
    title: string;
    createdDate: string;
    expiredDate: string;
}

export interface ITodoItem {
    _id: string;
    title: string;
    createdDate: string;
    expiredDate: string;
    completed: boolean;
}

export interface IUserTasksResponse {
    tasks: ITodoItem[];
    totals: {
        all: number;
        completed: number;
        active: number;
    };
}

export interface IDeleteCoompletedAction {
    type: actionTypes.DELETE_COMPLETED;
}

export interface IFetchTasksRequestAction {
    type: actionTypes.FETCH_TASKS_REQUEST;
}

export interface IFetchTasksSuccessAction {
    type: actionTypes.FETCH_TASKS_SUCCESS;
    payload: {
        tasks: ITodoItem[];
        totals: {
            all: number;
            completed: number;
            active: number;
        };
    };
}

export interface IFetchTasksFailureAction {
    type: actionTypes.FETCH_TASKS_FAILURE;
    payload: string;
}

export interface IAddTaskRequestAction {
    type: actionTypes.ADD_TASK_REQUEST;
}

export interface IAddTaskSuccessAction {
    type: actionTypes.ADD_TASK_SUCCESS;
    payload: ITodoItem;
}

export interface IAddTaskFailureAction {
    type: actionTypes.ADD_TASK_FAILURE;
    payload: string;
}

export interface IEditTaskRequestAction {
    type: actionTypes.EDIT_TASK_REQUEST;
}

export interface IEditTaskSuccessAction {
    type: actionTypes.EDIT_TASK_SUCCESS;
    payload: ITodoItem;
}

export interface IEditTaskFailureAction {
    type: actionTypes.EDIT_TASK_FAILURE;
    payload: string;
}

export interface IDeleteTaskRequestAction {
    type: actionTypes.DELETE_TASK_REQUEST;
}

export interface IDeleteTaskSuccessAction {
    type: actionTypes.DELETE_TASK_SUCCESS;
    payload: string;
}

export interface IDeleteTaskFailureAction {
    type: actionTypes.DELETE_TASK_FAILURE;
    payload: string;
}

export interface IDeleteCompletedTasksRequestAction {
    type: actionTypes.DELETE_COMPLETED_TASKS_REQUEST;
}

export interface IDeleteCompletedTasksSuccessAction {
    type: actionTypes.DELETE_COMPLETED_TASKS_SUCCESS;
}

export interface IDeleteCompletedTasksFailureAction {
    type: actionTypes.DELETE_COMPLETED_TASKS_FAILURE;
    payload: string;
}

export interface ISetSearchQueryAction {
    type: actionTypes.SET_SEARCH_QUERY;
    payload: string;
}

export interface ISetFilterAction {
    type: actionTypes.SET_FILTER;
    payload: string;
}

export interface IResetTodoStateAction {
    type: actionTypes.RESET_TODO_STATE;
}

export type ITodoListAction =
    IDeleteCoompletedAction |
    IFetchTasksRequestAction |
    IFetchTasksSuccessAction |
    IFetchTasksFailureAction |
    IAddTaskRequestAction |
    IAddTaskSuccessAction |
    IAddTaskFailureAction |
    IEditTaskRequestAction |
    IEditTaskSuccessAction |
    IEditTaskFailureAction |
    IDeleteTaskRequestAction |
    IDeleteTaskSuccessAction |
    IDeleteTaskFailureAction |
    IDeleteCompletedTasksRequestAction |
    IDeleteCompletedTasksSuccessAction |
    IDeleteCompletedTasksFailureAction |
    ISetSearchQueryAction |
    ISetFilterAction |
    IResetTodoStateAction;
