import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_URI} from "../api/api.js";


export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (productId, {getState}) => {
        const language = getState().language.currentLanguage;
        const response = await axios.get(
            `http://127.0.0.1:8080/item?item_id=${productId}&lang=${language}`
        );
        return response.data;
    }
);


export const fetchProductInCollection = createAsyncThunk(
    'products/fetchProductInCollection',
    async (productId, {getState}) => {
        const language = getState().language.currentLanguage;
        const response = await axios.get(
            `http://127.0.0.1:8080/items/collection?collection_id=${productId}&lang=${language}`
        );
        return response.data;
    }
);

export const fetchPopularProducts = createAsyncThunk(
    'products/fetchPopularProducts',
    async (_, {getState}) => {
        const language = getState().language.currentLanguage;
        const response = await axios.get(
            `http://127.0.0.1:8080/popular?lang=${language}`
        );
        const collection = response.data.collections;
        const item = response.data.items;
        return [...collection, ...item];
    }
);

export const fetchNewProducts = createAsyncThunk(
    'products/fetchNewProducts',
    async (_, {getState}) => {
        const language = getState().language.currentLanguage;
        const response = await axios.get(
            `http://127.0.0.1:8080/new?lang=${language}`
        );
        const collection = response.data.collections;

        console.log(collection)
        const item = response.data.items;
        return [...collection, ...item];
    }
);


export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (categoryId, {getState}) => {
        const language = getState().language.currentLanguage;
        const response = await axios.get(`http://127.0.0.1:8080/items?categoryId=${categoryId}&lang=${language}`, {
            params: {category_id: categoryId, lang: language},
        });

        return response.data;
    }
);


export const fetchByProducer = createAsyncThunk(
    'products/fetchByProducer',
    async (_, {getState}) => {
        const language = getState().language.currentLanguage;
        const response = await axios.get(`${API_URI}/search?lang=${language}&is_producer=true`,)

        return [...response.data.items, ...response.data.collections];
    }
)

export const searchByInputValue = createAsyncThunk(
    'products/searchByInputValue',
    async (inputValue, {getState, rejectWithValue}) => {
        try {
            const language = getState().language.currentLanguage;
            const response = await axios.get(`${API_URI}/search?lang=${language}&q=${inputValue}`);

            console.log(response.data)
            return [...response.data.collections, ...response.data.items];
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch data');
        }
    }
);


const productsSlice = createSlice({
    name: 'products',
    initialState: {
        data: [],
        selectedProduct: null,
        productsInCollection: [],
        popularProducts: [],
        newProducts: [],
        filteredProducts: [],
        loading: false,
        error: null,
        inputValue: '',
    },
    reducers: {
        setInputValue: (state, action) => {
            state.inputValue = action.payload;
        },
        resetFiltered: (state) => {
            state.filteredProducts = []
        },
        resetNewProducts: (state) => {
            state.newProducts = [];
        },
        resetProducts: (state) => {
            state.data = [];
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchProductInCollection.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductInCollection.fulfilled, (state, action) => {
                state.loading = false;
                state.productsInCollection = action.payload;
            })
            .addCase(fetchProductInCollection.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchPopularProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPopularProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.popularProducts = action.payload;
            })
            .addCase(fetchPopularProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchByProducer.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchByProducer.fulfilled, (state, action) => {
                state.loading = false;
                state.filteredProducts = action.payload;
            })
            .addCase(fetchByProducer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(searchByInputValue.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchByInputValue.fulfilled, (state, action) => {
                state.loading = false;
                state.newProducts = action.payload;
            })
            .addCase(searchByInputValue.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const {setInputValue, resetNewProducts, resetProducts, resetFiltered} = productsSlice.actions;

export default productsSlice.reducer;
