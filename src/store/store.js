import {configureStore} from "@reduxjs/toolkit";
import getCategories from "./slices/getCategories.js";
import paginationReducer from "./slices/paginationSlice.js";
import productsReducer from "./slices/getProducts.js";
const store = configureStore({
    reducer: {
        categories: getCategories,
        pagination: paginationReducer,
        products: productsReducer
    },
});

export default store;