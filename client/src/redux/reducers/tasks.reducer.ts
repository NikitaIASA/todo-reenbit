import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITodoItem } from '@/core/api/todo-list/tasks/dto/task.dto';
import { FILTER_OPTIONS } from '@/consts/filterOptions';
import { addUserTask, deleteCompletedTasks, deleteTask, editTask, fetchUserTasks } from '../thunks/tasks.thunks';

export interface TodoTotals {
    all: number;
    completed: number;
    active: number;
}
export interface TodoState {
    todos: ITodoItem[];
    totals: TodoTotals;
    loading: boolean;
    error: string | null;
    searchQuery: string;
    filter: string;
}

const initialState: TodoState = {
    todos: [],
    totals: { all: 0, completed: 0, active: 0 },
    loading: false,
    error: null,
    searchQuery: '',
    filter: FILTER_OPTIONS.ALL,
};

const tasksSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload;
        },
        setFilter(state, action: PayloadAction<string>) {
            state.filter = action.payload;
        },
        resetTodoState(state) {
            state.todos = [];
            state.totals = { all: 0, completed: 0, active: 0 };
            state.loading = false;
            state.error = null;
            state.searchQuery = '';
            state.filter = FILTER_OPTIONS.ALL;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserTasks.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchUserTasks.fulfilled, (state, action) => {
            console.log( action.payload)
            state.todos = action.payload.tasks;
            state.totals = action.payload.totals;
            state.loading = false;
        });
        builder.addCase(fetchUserTasks.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || null;
        });

        builder.addCase(addUserTask.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(addUserTask.fulfilled, (state, action) => {
            let shouldAddTask = true;
            if (state.filter === FILTER_OPTIONS.COMPLETED && !action.payload.completed) {
                shouldAddTask = false;
            }
            if (state.filter === FILTER_OPTIONS.ACTIVE && action.payload.completed) {
                shouldAddTask = false;
            }
            if (shouldAddTask) {
                state.todos.unshift(action.payload);
            }
            state.loading = false;
        });
        builder.addCase(addUserTask.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || null;
        });

        builder.addCase(editTask.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(editTask.fulfilled, (state, action) => {
            state.todos = state.todos.map((todo) =>
                todo._id === action.payload._id ? action.payload : todo
            );
            state.loading = false;
        });
        builder.addCase(editTask.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || null;
        });

        builder.addCase(deleteTask.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteTask.fulfilled, (state, action) => {
            state.todos = state.todos.filter((todo) => todo._id !== action.payload);
            state.loading = false;
        });
        builder.addCase(deleteTask.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || null;
        });

        builder.addCase(deleteCompletedTasks.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteCompletedTasks.fulfilled, (state) => {
            state.todos = state.todos.filter((todo) => !todo.completed);
            state.loading = false;
        });
        builder.addCase(deleteCompletedTasks.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || null;
        });
    },
});

export const { setSearchQuery, setFilter, resetTodoState } = tasksSlice.actions;
export default tasksSlice.reducer;
