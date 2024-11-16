import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {API_URI} from "../../api/api.js";
import * as logger from "react-dom/test-utils";

export const searchByProducer = createAsyncThunk(
    "search/searchByProducer",
    async (_, {rejectWithValue, getState}) => {
        try {
            const language = getState().language.currentLanguage;
            const response = await axios.get(`${API_URI}/search?lang=${language}&is_producer=true`);

            console.log(response.data)
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response?.data || "An error occurred");
        }
    }
);

export const searchByFilters = createAsyncThunk(
    "search/searchByFilters",
    async (inputValue, {rejectWithValue, getState}) => {
        try {
            const language = getState().language.currentLanguage;

            const response = await axios.get(`${API_URI}/search?lang=${language}&q=${inputValue}`);

            const collection = Array.isArray(response.data.collections) ? response.data.collections : [];
            const item = Array.isArray(response.data.items) ? response.data.items : [];

            return [...collection, ...item];
        } catch (error) {
            console.error('API error:', error);
            return rejectWithValue(error.response?.data || "An error occurred");
        }
    }
);


export const search = createSlice({
    name: "search",
    initialState: {
        results: [],
        savedResults: [],
        activeFilters: {
            producer: null,
            inputValue: ""
        },
        status: "idle",
        error: null,
    },
    reducers: {
        setFilter: (state, action) => {
            const {filterName, value} = action.payload;
            state.activeFilters[filterName] = value;
        },
        clearFilter: (state, action) => {
            const {filterName} = action.payload;
            state.activeFilters[filterName] = null;
        },
        clearAllFilters: (state) => {
            state.activeFilters = {
                producer: null,
                inputValue: ""
            };
        },
        saveResults: (state, action) => {
            state.savedResults = action.payload;
        },
        clearResults: (state) => {
            state.results = [];
        },
        setInputValue: (state, action) => {
            state.activeFilters.inputValue = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchByProducer.pending, (state) => {
                state.status = "loading";
            })
            .addCase(searchByProducer.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.results = action.payload;
            })
            .addCase(searchByProducer.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(searchByFilters.pending, (state) => {
                state.status = "loading";
            })
            .addCase(searchByFilters.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.results = action.payload;
            })
            .addCase(searchByFilters.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export const {setFilter, clearFilter, clearAllFilters, saveResults, clearResults, setInputValue} = search.actions;

export default search.reducer;
