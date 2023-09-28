import { RootState } from "@/redux/store";

export const selectTodoItems = (state: RootState) => state.todos.todos;
