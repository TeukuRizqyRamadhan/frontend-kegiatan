import { configureStore } from '@reduxjs/toolkit';
import kegiatanReducer from './kegiatanSlice';

const store = configureStore({
    reducer: {
        kegiatan: kegiatanReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
