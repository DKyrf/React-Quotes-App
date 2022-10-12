import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    author: "",
    text: "",
    isValid: false,
    authTouched: false,
    textTouched: false,
};

const newQuoteSlice = createSlice({
    name: "newQuote",
    initialState,
    reducers: {
        setAuth(state, action) {
            state.authTouched = true;
            state.author = action.payload;
        },
        setText(state, action) {
            state.textTouched = true;
            state.text = action.payload;
        },
        setValid(state, action) {
            state.isValid = action.payload;
        },
        reset(state) {
            state.author = ""
            state.text = ""
            state.isValid = false
            state.authTouched = false
            state.textTouched = false
        },
        authBlurHandler(state) {
            state.authTouched = false;
        },
        textBlurHandler(state) {
            state.textTouched = false;
        },
    },
});

export const newQuoteReducer = newQuoteSlice.reducer;
export const newQuoteAction = newQuoteSlice.actions;
