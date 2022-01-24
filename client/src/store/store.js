import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'main-root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, userReducer);

export default configureStore({
    reducer: {
        user: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});