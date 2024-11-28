import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_URI} from "../api/api.js";

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async (_, {getState}) => {
        const language = getState().language.currentLanguage;
        const response = await axios.get(`http://127.0.0.1:8080/category?lang=${language}`);
        return response.data;
    }
);
export const createCategory = createAsyncThunk(
    "categories/createCategory",
    async (category_list, {rejectWithValue}) => {
        try {
            const response = await axios.post(
                `${API_URI}/category`,
                {category_list},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
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
            .addCase(createCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories.push(action.payload);
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

export default categoriesSlice.reducer;