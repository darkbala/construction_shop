import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_URI} from "../api/api.js";


export const fetchCollectionById = createAsyncThunk(
    'products/fetchCollectionById',
    async (collectionId, {getState}) => {
        const language = getState().language.currentLanguage;
        const response = await axios.get(
            `http://127.0.0.1:8080/collection?collection_id=${collectionId}&lang=${language}`
        );
        return response.data;
    }
);

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

export const fetchByProducerIsPainted = createAsyncThunk(
    'products/fetchByProducerIsPainted',
    async (_, {getState}) => {
        const language = getState().language.currentLanguage;
        const response = await axios.get(`${API_URI}/search?lang=${language}&is_producer=true&is_painted=true`,)


        console.log(response.data.items, "aaxaxaaxaaa")
        console.log(response.data.collections, "ssssssssaxaaa")
        return [...response.data.items, ...response.data.collections];
    }
)

export const fetchByDistributiv = createAsyncThunk(
    'products/fetchByDistributiv',
    async (_, {getState}) => {
        const language = getState().language.currentLanguage;
        const response = await axios.get(`${API_URI}/search?lang=${language}&is_producer=false`,)

        return [...response.data.items, ...response.data.collections];
    }
)

export const fetchByDistr = createAsyncThunk(
    'products/fetchByDistr',
    async (_, {getState}) => {
        const language = getState().language.currentLanguage;
        const response = await axios.get(`${API_URI}/search?lang=${language}&is_producer=false`,)

        return [...response.data.items, ...response.data.collections];
    }
)

export const searchByInputValue = createAsyncThunk(
    'products/searchByInputValue',
    async (inputValue, {getState, rejectWithValue}) => {
        try {
            const language = getState().language.currentLanguage;
            const response = await axios.get(`${API_URI}/search?lang=${language}&q=${inputValue}`);
            return [...response.data.collections, ...response.data.items];
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch data');
        }
    }
);


export const fetchRecommendationCollection = createAsyncThunk(
    'products/fetchRecomendationCollection',
    async (_, {rejectWithValue, getState}) => {
        try {
            const language = getState().language.currentLanguage;
            const response = await axios.get(`${API_URI}/collections/rec?lang=${language}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch data');
        }
    }
)

export const fetchDiscountProducts = createAsyncThunk(
    'products/fetchDiscountProducts',
    async (_, {rejectWithValue, getState}) => {
        try {
            const language = getState().language.currentLanguage;
            const response = await axios.get(`http://127.0.0.1:8080/discounts?lang=${language}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch data');
        }
    }
)


const productsSlice = createSlice({
    name: 'products',
    initialState: {
        data: [],
        selectedProduct: null,
        selectedCollection: null,
        productsInCollection: [],
        popularProducts: [],
        newProducts: [],
        filteredProducts: [],
        distr:[],
        discount: [],
        recommendationCollections: [],
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

            .addCase(fetchCollectionById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCollectionById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProduct = action.payload;
            })
            .addCase(fetchCollectionById.rejected, (state, action) => {
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

            .addCase(fetchNewProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNewProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.newProducts = action.payload;
            })
            .addCase(fetchNewProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })


            .addCase(fetchDiscountProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDiscountProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.discount = action.payload;
            })
            .addCase(fetchDiscountProducts.rejected, (state, action) => {
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

            .addCase(fetchByDistr.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchByDistr.fulfilled, (state, action) => {
                state.loading = false;
                state.distr = action.payload;
            })
            .addCase(fetchByDistr.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(fetchByProducerIsPainted.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchByProducerIsPainted.fulfilled, (state, action) => {
                state.loading = false;
                state.filteredProducts = action.payload;
            })
            .addCase(fetchByProducerIsPainted.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })


            .addCase(fetchByDistributiv.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchByDistributiv.fulfilled, (state, action) => {
                state.loading = false;
                state.filteredProducts = action.payload;
            })
            .addCase(fetchByDistributiv.rejected, (state, action) => {
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
            })


            .addCase(fetchRecommendationCollection.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRecommendationCollection.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchRecommendationCollection.fulfilled, (state, action) => {
                state.loading = false;
                state.recommendationCollections = action.payload;
            })

    }
});

export const {setInputValue, resetNewProducts, resetProducts, resetFiltered} = productsSlice.actions;

export default productsSlice.reducer;
