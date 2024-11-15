import {configureStore} from "@reduxjs/toolkit";
import getCategories from "./slices/getCategories.js";
import paginationReducer from "./slices/paginationSlice.js";
import productsReducer from "./slices/getProducts.js";
import languageReducers from "./slices/getLanguages.js";
import languageReducer from './slices/languageState.js'
import reviewsReducer from "./slices/reviewsSlice.js"

const store = configureStore({
    reducer: {
        categories: getCategories,
        pagination: paginationReducer,
        products: productsReducer,
        languages: languageReducers,
        language: languageReducer,
        reviews: reviewsReducer
    },
});

export default store;