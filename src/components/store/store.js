import { configureStore } from "@reduxjs/toolkit";
import { newQuoteReducer } from "./newQuoteSlice";
import { httpReducer } from "./httpSlice";


const store = configureStore({
    reducer: {
        newQuoteReducer,
        httpReducer,
    }
})

export default store