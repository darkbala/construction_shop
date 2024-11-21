import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {API_URI} from "../../../api/api.js";

export const fetchAllCollections = createAsyncThunk(
    'admin/collections/fetchAllCollections',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8080/getAllCollection`);

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)


export const deleteCollectionById = createAsyncThunk(
    'admin/collections/deleteCollectionById',
    async (id, {rejectWithValue}) => {
        try {
            const collection = await axios.delete(`http://127.0.0.1:8080/collections?collection_id={id}`);
            return collection.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const collectionUpdateById = createAsyncThunk(
    'admin/collections/updateCollectionById',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const formData = new FormData();

            // Добавляем данные в `formData`
            formData.append('collection', JSON.stringify(data.collection)); // JSON-строка
            formData.append('photos', data.photos); // Файл
            formData.append('isMain_' + data.photos.name, data.isMain); // Основное фото
            formData.append(
                'hashColor_' + data.photos.name,
                data.hashColor // Hash для фото
            );

            console.log(formData)
            const response = await axios.put(`${API_URI}/collections?collection_id=${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${data.token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);


const collectionsSlice = createSlice({
    name: 'collections',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder

            .addCase(fetchAllCollections.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllCollections.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchAllCollections.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })

            .addCase(deleteCollectionById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCollectionById.fulfilled, (state, action) => {
                state.loading = false;
                state.data = state.data.filter((item) => item.id !== action.payload.id);
            })
            .addCase(deleteCollectionById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })

            .addCase(collectionUpdateById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(collectionUpdateById.fulfilled, (state, action) => {
                state.loading = false;
                state.data = state.data.map((item) =>
                    item.id === action.payload.id ? action.payload : item
                );
            })
            .addCase(collectionUpdateById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })


    },
});


export default collectionsSlice.reducer;