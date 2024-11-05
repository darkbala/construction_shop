import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_URI} from "../api/api.js";

export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id) => {
    const response = await axios.get(`${API_URI}/events/${id}/`);

    return response.data;

});

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        categories: [],
        loading: false,
        selectedMeals: [],
        product: null,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default productsSlice.reducer;
