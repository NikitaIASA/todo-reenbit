import { actionTypes } from "./actionTypes";

export interface TodoType {
    title: string;
    startDate: string;
    endDate: string;
}

export interface ITodoItem {
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    done: boolean;
}

export interface IAddItemAction {
    type: actionTypes.ADD_ITEM;
    payload: ITodoItem;
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

export type ITodoListAction = IAddItemAction | IToggleDoneAction | IDeleteItemAction | IEditItemAction | IDeleteCoompletedAction;