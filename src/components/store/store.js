import { configureStore } from "@reduxjs/toolkit";
import { quoteReducer } from "./quotesSlice";
import { newQuoteReducer } from "./newQuoteSlice";
import { httpReducer } from "./httpSlice";


const store = configureStore({
    reducer: {
        quoteReducer,
        newQuoteReducer,
        httpReducer,
    }
})

export default store