import { configureStore } from "@reduxjs/toolkit";
import { newQuoteReducer } from "./newQuoteSlice";


const store = configureStore({
    reducer: {
        newQuoteReducer,
    }
})

export default store