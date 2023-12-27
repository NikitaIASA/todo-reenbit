import { ITodoItem, ITodoListAction } from "@/types/todoItemDto";
import { actionTypes } from "@/types/actionTypes";

interface TodoState {
    todos: ITodoItem[];
    loading: boolean;
    error: string | null;
}

const initialState: TodoState = {
    todos: [],
    loading: false,
    error: null,
};

const todoReducer = (state = initialState, action: ITodoListAction): TodoState => {
    switch (action.type) {
        case actionTypes.ADD_ITEM:
            return {
                ...state,
                todos: [action.payload, ...state.todos],
            };
        case actionTypes.TOGGLE_DONE:
            return {
                ...state,
                todos: state.todos.map((todo: ITodoItem) => (
                    todo._id === action.payload ? { ...todo, completed: !todo.completed } : todo
                )),
            };
        case actionTypes.DELETE_ITEM:
            return {
                ...state,
                todos: state.todos.filter((todo: ITodoItem) => todo._id !== action.payload),
            };
        case actionTypes.EDIT_ITEM:
            return {
                ...state,
                todos: state.todos.map((todo: ITodoItem) =>
                    todo._id === action.payload._id ? { ...todo, ...action.payload } : todo
                ),
            };
        case actionTypes.DELETE_COMPLETED:
            return {
                ...state,
                todos: state.todos.filter(todo => !todo.completed),
            };
        case actionTypes.FETCH_TASKS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case actionTypes.FETCH_TASKS_SUCCESS:
            return {
                ...state,
                todos: action.payload,
                loading: false
            };
        case actionTypes.FETCH_TASKS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};


export default todoReducer;
