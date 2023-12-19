import { createStore } from 'redux';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import todoReducer from './reducers/todoReducer';
import filterReducer from './reducers/filterReducer';

const rootReducer = combineReducers({
    todos: todoReducer,
    filter: filterReducer,
});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    persistedReducer,
);

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type GetRootState = typeof store.getState;
