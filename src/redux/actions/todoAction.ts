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
