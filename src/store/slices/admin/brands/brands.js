import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {API_URI} from "../../../api/api.js";
import {collectionUpdateById, deleteCollectionById} from "../collections/collections.js";

export const fetchBrands = createAsyncThunk(
    'brands/fetchBrands',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${API_URI}/brands`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch data');
        }
    }
);

export const createBrands = createAsyncThunk(
    'brands/fetchBrands',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${API_URI}/brands`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch data');
        }
    }
);
export const updateBrands = createAsyncThunk(
    'brands/fetchBrands',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${API_URI}/brands`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch data');
        }
    }
);

export const deleteBrands = createAsyncThunk(
    'brands/fetchBrands',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${API_URI}/brands`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch data');
        }
    }
);


export const brands = createSlice({
    name: "brands",
    initialState: {
        brands: []
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBrands.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBrands.fulfilled, (state, action) => {
                state.loading = false;
                state.brands = action.payload;
            })
            .addCase(fetchBrands.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteCollectionById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCollectionById.rejected, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    state.error = action.payload;
                } else {
                    state.error = action.error.message || "Произошла ошибка";
                }
            })
            .addCase(deleteCollectionById.fulfilled, (state, action) => {
                state.loading = false;
                // Используйте ID из meta.arg, если в payload нет нужного id
                state.data = state.data.filter((item) => item.id !== action.meta.arg);
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
    }
})

export default brands.reducer;

