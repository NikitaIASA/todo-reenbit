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


export interface IToggleDoneAction {
    type: actionTypes.TOGGLE_DONE;
    payload: string;
}

export interface IDeleteItemAction {
    type: actionTypes.DELETE_ITEM;
    payload: string;
}

export interface IEditItemAction {
    type: actionTypes.EDIT_ITEM;
    payload: ITodoItem;
}

export interface IDeleteCoompletedAction {
    type: actionTypes.DELETE_COMPLETED;
}

export interface IFetchTasksRequestAction {
    type: actionTypes.FETCH_TASKS_REQUEST;
}

export interface IFetchTasksSuccessAction {
    type: actionTypes.FETCH_TASKS_SUCCESS;
    payload: ITodoItem[];
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

export type ITodoListAction = IToggleDoneAction | IDeleteItemAction | IEditItemAction | IDeleteCoompletedAction | IFetchTasksRequestAction | IFetchTasksSuccessAction | IFetchTasksFailureAction
    | IAddTaskRequestAction | IAddTaskSuccessAction | IAddTaskFailureAction;
