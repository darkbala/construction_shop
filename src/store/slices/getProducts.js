import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (categoryId) => {
        const response = await axios.get('http://127.0.0.1:8080/items', {
            params: { category_id: categoryId, lang: 'en' },
        });
        return response.data;
    }
);

export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (productId) => {
        const response = await axios.get(
            `http://127.0.0.1:8080/item?item_id=${productId}&lang=en`
        );
        return response.data;
    }
);

export const fetchProductInCollection = createAsyncThunk(
    'products/fetchProductInCollection',
    async (productId) => {
        const response = await axios.get(
            `http://127.0.0.1:8080/items/collection?collection_id=${productId}&lang=en`
        );
        return response.data;
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        data: [],
        selectedProduct: null,
        productsInCollection: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearSelectedProduct: (state) => {
            state.selectedProduct = null;
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
            // Обработчик для fetchProductInCollection
            .addCase(fetchProductInCollection.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductInCollection.fulfilled, (state, action) => {
                state.loading = false;
                state.productsInCollection = action.payload; // сохраняем продукты коллекции
            })
            .addCase(fetchProductInCollection.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { clearSelectedProduct } = productsSlice.actions;

export default productsSlice.reducer;
