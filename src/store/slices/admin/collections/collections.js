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
    async (collectionId, {rejectWithValue}) => {
        try {
            const collection = await axios.delete(`${API_URI}collections/${collectionId}`);
            return collection.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const collectionUpdateById = createAsyncThunk(
    'admin/collections/updateCollectionById',
    async ({collectionId, data, language}, {rejectWithValue}) => {
        try {
            const response = await axios.put(`${API_URI}/collections/${collectionId}?lang=${language}`, data,);
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