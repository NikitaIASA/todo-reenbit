import { createStore } from 'redux';
import { combineReducers } from 'redux';

import todoReducer from './reducers/todoReducer';
import filterReducer from './reducers/filterReducer';

const rootReducer = combineReducers({
    todos: todoReducer,
    filter: filterReducer,
});

export const store = createStore(
    rootReducer,
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type GetRootState = typeof store.getState;
