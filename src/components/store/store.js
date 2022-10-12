import { configureStore } from "@reduxjs/toolkit";
import { quoteReducer } from "./quotesSlice";
import { newQuoteReducer } from "./newQuoteSlice";


const store = configureStore({
    reducer: {
        quoteReducer,
        newQuoteReducer,
    }
})

export default store