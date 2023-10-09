import { ITodoItem, ITodoListAction } from "@/types/todoItemDto";
import { actionTypes } from "@/types/actionTypes";

interface TodoState {
    todos: ITodoItem[];
}

const initialState: TodoState = {
    todos: [],
};

const todoReducer = (state = initialState, action: ITodoListAction): TodoState => {
    switch (action.type) {
        case actionTypes.ADD_ITEM:
            return {
                todos: [
                    ...state.todos,
                    action.payload
                ],
            };
        case actionTypes.TOGGLE_DONE:
            return {
                todos: state.todos.map((todo: ITodoItem) => (
                    todo.id === action.payload ? { ...todo, done: !todo.done } : todo
                ))
            };
        case actionTypes.DELETE_ITEM:
            return {
                todos: state.todos.filter((todo: ITodoItem) => todo.id !== action.payload)
            }
        case actionTypes.EDIT_ITEM:
            return {
                todos: state.todos.map((todo: ITodoItem) =>
                    todo.id === action.payload.id ? { ...todo, ...action.payload } : todo
                ),
            };
        case actionTypes.DELETE_COMPLETED:
            return {
                ...state,
                todos: state.todos.filter(todo => !todo.done)
            };
        default:
            return state;
    }
};

export default todoReducer;
