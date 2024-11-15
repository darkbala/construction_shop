import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async (_, {getState}) => {
        const language = getState().language.currentLanguage;
        const response = await axios.get(`http://127.0.0.1:8080/category?lang=${language}`);
        return response.data;
    }
);


const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        loading: false,
        selectedMeals: [],
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

export default categoriesSlice.reducer;