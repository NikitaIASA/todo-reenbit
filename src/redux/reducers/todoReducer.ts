import { ITodoItem, ITodoListAction } from "@/types/todoItemDto";
import { actionTypes } from "@/types/actionTypes";

interface TodoState {
    todos: ITodoItem[];
}

const initialState: TodoState = {
    todos: [],
};

const todoReducer = (state = initialState, { type, payload }: ITodoListAction): TodoState => {
    switch (type) {
        case actionTypes.ADD_ITEM:
            return {
                todos: [
                    ...state.todos,
                    payload
                ],
            };
        case actionTypes.TOGGLE_DONE:
            return {
                todos: state.todos.map((todo: ITodoItem) => (
                    todo.id === payload ? { ...todo, done: !todo.done } : todo
                ))
            };
        case actionTypes.DELETE_ITEM:
            return {
                todos: state.todos.filter((todo: ITodoItem) => todo.id !== payload)
            }
        case actionTypes.EDIT_ITEM:
            return {
                todos: state.todos.map((todo: ITodoItem) =>
                    todo.id === payload.id ? { ...todo, ...payload } : todo
                ),
            };
        default:
            return state;
    }
};

export default todoReducer;
