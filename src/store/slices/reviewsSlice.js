import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchReviews = createAsyncThunk(
    'reviews/fetchReviews',
    async () => {
        const response = await axios.get(`http://127.0.0.1:8080/reviews`);

        return response.data;
    }
);

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default reviewsSlice.reducer;
