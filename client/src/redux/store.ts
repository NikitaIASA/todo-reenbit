import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import todoReducer from './reducers/tasks.reducer';
import authReducer from './reducers/auth.reducer';

const rootReducer = combineReducers({
    todos: todoReducer,
    auth: authReducer,
});

export const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);

export type RootState = ReturnType<typeof store.getState>;
type AppAction = ReturnType<typeof store.dispatch>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AppAction>;
export type GetRootState = typeof store.getState;
