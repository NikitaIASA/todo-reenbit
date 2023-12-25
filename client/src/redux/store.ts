import { createStore, applyMiddleware, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk, {ThunkDispatch} from 'redux-thunk';
import storage from 'redux-persist/lib/storage';

import todoReducer from './reducers/todoReducer';
import filterReducer from './reducers/filterReducer';
import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({
    todos: todoReducer,
    filter: filterReducer,
    auth: authReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    persistedReducer,
    applyMiddleware(thunk)
);

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
type AppAction = ReturnType<typeof store.dispatch>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AppAction>;
export type GetRootState = typeof store.getState;
