import {configureStore} from "@reduxjs/toolkit";
import getCategories from "./slices/getCategories.js";
import paginationReducer from "./slices/paginationSlice.js";
import productsReducer from "./slices/getProducts.js";
import languageReducers from "./slices/getLanguages.js";
import languageReducer from './slices/languageState.js'
import reviewsReducer from "./slices/reviewsSlice.js"
import vacanciesReducer from "./slices/getVacancy.js"
import collectionReducer from "./slices/getCollcetions.js"
import authReducer from "./slices/auth/auth.js";

const store = configureStore({
    reducer: {
        categories: getCategories,
        pagination: paginationReducer,
        products: productsReducer,
        languages: languageReducers,
        language: languageReducer,
        reviews: reviewsReducer,
        vacancies: vacanciesReducer,
        collections: collectionReducer,
        auth: authReducer,
    },
});

export default store;