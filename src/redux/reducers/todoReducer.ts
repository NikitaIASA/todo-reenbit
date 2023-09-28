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
                    {
                        id: action.payload.id,
                        title: action.payload.title,
                        startDate: action.payload.startDate,
                        endDate: action.payload.endDate,
                    },
                ],
            };
        default:
            return state;
    }
};

export default todoReducer;
