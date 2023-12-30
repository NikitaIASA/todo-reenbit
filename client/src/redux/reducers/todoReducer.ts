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
        case actionTypes.ADD_TASK_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case actionTypes.ADD_TASK_SUCCESS:
            return {
                ...state,
                todos: [action.payload, ...state.todos],
                loading: false
            };
        case actionTypes.ADD_TASK_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case actionTypes.EDIT_TASK_REQUEST:
            return {
                ...state,
                loading: true
            };
        case actionTypes.EDIT_TASK_SUCCESS:
            return {
                ...state,
                todos: state.todos.map((todo) =>
                    todo._id === action.payload._id ? action.payload : todo
                ),
                loading: false
            };
        case actionTypes.EDIT_TASK_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case actionTypes.DELETE_TASK_REQUEST:
            return {
                ...state,
                loading: true
            };
        case actionTypes.DELETE_TASK_SUCCESS:
            return {
                ...state,
                todos: state.todos.filter((todo) => todo._id !== action.payload),
                loading: false
            };
        case actionTypes.DELETE_TASK_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        default:
            return state;
    }
};


export default todoReducer;
