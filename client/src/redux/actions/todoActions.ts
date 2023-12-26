import { IDeleteCoompletedAction, ITodoItem } from "@/types/todoItemDto";
import { actionTypes } from "@/types/actionTypes";
import { IAddItemAction, IToggleDoneAction, IDeleteItemAction, IEditItemAction } from "@/types/todoItemDto";

export const addTodo = (todo: ITodoItem): IAddItemAction => ({
    type: actionTypes.ADD_ITEM,
    payload: todo,
});

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
