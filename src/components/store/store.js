import { configureStore } from "@reduxjs/toolkit";
import { newQuoteReducer } from "./newQuoteSlice";
import { authReducer } from "./authSlice"


const store = configureStore({
    reducer: {
        newQuoteReducer,
        authReducer,
    }
})

export default store