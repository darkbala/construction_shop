import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


export const fetchLanguages = createAsyncThunk(
    'languages/fetchLanguages',
    async () => {
        const response = await axios.get(`http://127.0.0.1:8080/languages`);
        return response.data;
    }
);


const getLanguages = createSlice({
    name: 'languages',
    initialState: {
        data: [],
        selectedLanguages: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLanguages.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLanguages.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchLanguages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});

export default getLanguages.reducer;