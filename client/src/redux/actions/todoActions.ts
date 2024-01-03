import { IDeleteCoompletedAction, ITodoItem } from "@/types/todoItemDto";
import { actionTypes } from "@/types/actionTypes";
import { IToggleDoneAction, IDeleteItemAction, IEditItemAction } from "@/types/todoItemDto";

export const toggleDone = (todoId: string): IToggleDoneAction => ({
    type: actionTypes.TOGGLE_DONE,
    payload: todoId,
});

export const deleteToDo = (todoId: string): IDeleteItemAction => ({
    type: actionTypes.DELETE_ITEM,
    payload: todoId,
});

export const editTodo = (todo: ITodoItem): IEditItemAction => ({
    type: actionTypes.EDIT_ITEM,
    payload: todo,
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
