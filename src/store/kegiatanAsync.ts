import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Kegiatan } from '../types';

const API = axios.create({
    baseURL: 'http://localhost:3000',
});

export const fetchKegiatan = createAsyncThunk('kegiatan/fetchKegiatan', async () => {
    const response = await API.get<Kegiatan[]>('/kegiatan');
    return response.data;
});

export const addKegiatan = createAsyncThunk('kegiatan/addKegiatan', async (namaKegiatan: string) => {
    const response = await API.post<Kegiatan>('/kegiatan', { namaKegiatan });
    return response.data;
});

export const deleteKegiatan = createAsyncThunk('kegiatan/deleteKegiatan', async (id: number) => {
    await API.delete(`/kegiatan/${id}`);
    return id;
});

export const editKegiatan = createAsyncThunk(
    'kegiatan/editKegiatan',
    async ({ id, namaKegiatan }: { id: number; namaKegiatan: string }) => {
        const response = await API.patch<Kegiatan>(`/kegiatan/${id}`, { namaKegiatan });
        return response.data;
    }
);
