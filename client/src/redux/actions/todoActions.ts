import { IDeleteCoompletedAction, ITodoItem } from "@/types/todoItemDto";
import { actionTypes } from "@/types/actionTypes";
import { IDeleteItemAction } from "@/types/todoItemDto";

export const deleteToDo = (todoId: string): IDeleteItemAction => ({
    type: actionTypes.DELETE_ITEM,
    payload: todoId,
});

export const deleteCompletedTodos = (): IDeleteCoompletedAction => ({
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
