import { ITodoItem } from "@/types/todoItemDto";
import { actionTypes } from "@/types/actionTypes";

export const addTodo = (todo: ITodoItem) => ({
    type: actionTypes.ADD_ITEM,
    payload: todo,
});

export const toggleDone = (todoId: string) => ({
    type: actionTypes.TOGGLE_DONE,
    payload: { id: todoId },
});

export const deleteToDo = (todoId: string) => ({
    type: actionTypes.DELETE_ITEM,
    payload: { id: todoId },
});

export const editTodo = (todo: ITodoItem) => ({
    type: actionTypes.EDIT_ITEM,
    payload: todo,
});
