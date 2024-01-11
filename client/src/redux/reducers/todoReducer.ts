import { ITodoItem, ITodoListAction } from "@/types/todoItemDto";
import { actionTypes } from "@/types/actionTypes";

interface TodoState {
    todos: ITodoItem[];
    totals: {
        all: number;
        completed: number;
        active: number;
    };
    loading: boolean;
    error: string | null;
    searchQuery: string;
    filter: string;
}

const initialState: TodoState = {
    todos: [],
    totals: {
        all: 0,
        completed: 0,
        active: 0
    },
    loading: false,
    error: null,
    searchQuery: '',
    filter: 'all',
};

const todoReducer = (state = initialState, action: ITodoListAction): TodoState => {
    switch (action.type) {
        case actionTypes.FETCH_TASKS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case actionTypes.FETCH_TASKS_SUCCESS:
            return {
                ...state,
                todos: action.payload.tasks,
                totals: action.payload.totals,
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
        case actionTypes.ADD_TASK_SUCCESS: {
            let shouldAddTask = true;

            if (state.filter === 'completed' && !action.payload.completed) {
                shouldAddTask = false;
            }
            if (state.filter === 'active' && action.payload.completed) {
                shouldAddTask = false;
            }

            return {
                ...state,
                todos: shouldAddTask ? [action.payload, ...state.todos] : state.todos,
                loading: false
            };
        }
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
        case actionTypes.DELETE_COMPLETED_TASKS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case actionTypes.DELETE_COMPLETED_TASKS_SUCCESS:
            return {
                ...state,
                todos: state.todos.filter((todo) => !todo.completed),
                loading: false
            };
        case actionTypes.DELETE_COMPLETED_TASKS_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case actionTypes.SET_SEARCH_QUERY:
            return {
                ...state,
                searchQuery: action.payload
            };

        case actionTypes.SET_FILTER:
            return {
                ...state,
                filter: action.payload
            };
        default:
            return state;
    }
};


export default todoReducer;
