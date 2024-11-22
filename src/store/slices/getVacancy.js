import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {API_URI} from "../api/api.js";

export const fetchVacancies = createAsyncThunk(
    "getVacancies/fetchVacancies",
    async (_, {getState}) => {
        const language = getState().language.currentLanguage;
        const response = await axios.get(`${API_URI}/vacancies?lang=${language}`);
        console.log(response.data)
        return response.data;
    }
);

export const createVacancy = createAsyncThunk(
    "getVacancies/createVacancy",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${API_URI}/vacancy`,
                data, // передаём данные напрямую
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);



export const getVacancy = createSlice({
    name: "vacancy",
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
            })
            .addCase(createVacancy.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createVacancy.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.vacancies = action.payload;
            })
            .addCase(createVacancy.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default getVacancy.reducer;
