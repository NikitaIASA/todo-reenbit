import { RootState } from "@/redux/store";

export const selectTodoItems = (state: RootState) => state.todos.todos;
export const selectCompletedTodos = (state: RootState) => {
    return state.todos.todos.filter(todo => todo.completed);
}
