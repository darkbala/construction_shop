import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URI } from "../api/api.js";

export const fetchVacancies = createAsyncThunk(
    "getVacancies/fetchVacancies",
    async (_, { getState }) => {
        const language = getState().language.currentLanguage;
        const response = await axios.get(`${API_URI}/vacancies?lang=${language}`);
        return response.data;
    }
);

export const getVacancy = createSlice({
    name: "getVacancy",
    initialState: {
        vacancies: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchVacancies.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchVacancies.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.vacancies = action.payload;
            })
            .addCase(fetchVacancies.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default getVacancy.reducer;
