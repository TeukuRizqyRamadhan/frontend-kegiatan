import { createSlice } from '@reduxjs/toolkit';
import { Kegiatan } from '../types';
import { fetchKegiatan, addKegiatan, deleteKegiatan, editKegiatan } from './kegiatanAsync';

interface KegiatanState {
    list: Kegiatan[];
    loading: boolean;
    error: string | null;
}

const initialState: KegiatanState = {
    list: [],
    loading: false,
    error: null,
};

const kegiatanSlice = createSlice({
    name: 'kegiatan',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchKegiatan.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchKegiatan.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchKegiatan.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to fetch kegiatan';
            })
            .addCase(addKegiatan.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addKegiatan.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
            })
            .addCase(addKegiatan.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to add kegiatan';
            })
            .addCase(deleteKegiatan.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteKegiatan.fulfilled, (state, action) => {
                state.loading = false;
                state.list = state.list.filter((kegiatan) => kegiatan.id !== action.payload);
            })
            .addCase(deleteKegiatan.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to delete kegiatan';
            })
            .addCase(editKegiatan.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editKegiatan.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.list.findIndex((kegiatan) => kegiatan.id === action.payload.id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            })
            .addCase(editKegiatan.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to edit kegiatan';
            });
    },
});

export default kegiatanSlice.reducer;
