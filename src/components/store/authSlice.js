import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    isLoggedIn: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logIn(state, action) {
            state.token = action.payload;
            state.isLoggedIn = !!action.payload;
        },
        logOut(state) {
            state.token = null
            state.isLoggedIn = false
        }
    }
});

export const authReducer = authSlice.reducer;
export const authAction = authSlice.actions;