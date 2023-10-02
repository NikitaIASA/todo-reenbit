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
        default:
            return state;
    }
};

export default todoReducer;
