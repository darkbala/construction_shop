import {configureStore} from "@reduxjs/toolkit";
import getCategories from "./slices/getCategories.js";
import paginationReducer from "./slices/paginationSlice.js";
const store = configureStore({
    reducer: {
        categories: getCategories,
        pagination: paginationReducer,
    },
});

export default store;