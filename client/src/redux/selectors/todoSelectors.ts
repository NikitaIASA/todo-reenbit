import { RootState } from "@/redux/store";

export const selectTodoItems = (state: RootState) => state.todos.todos;

export const selectCompletedTodos = (state: RootState) => {
    return state.todos.todos.filter(todo => todo.completed);
}
export const selectCompletedCount = (state: RootState) => state.todos.totals.completed;
export const selectIsLoading = (state: RootState) => state.todos.loading;
export const selectError = (state: RootState) => state.todos.error;
export const selectFilter = (state: RootState) => state.todos.filter;
export const selectSearchQuery = (state: RootState) => state.todos.searchQuery;
