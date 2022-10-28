import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem("token"),
    isLoggedIn: !!localStorage.getItem("token"),
    error: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logIn(state, action) {
            state.token = action.payload;
            state.isLoggedIn = !!action.payload;
            state.error = null
            localStorage.setItem("token", action.payload.token);
        },
        logOut(state) {
            state.token = null;
            state.isLoggedIn = false;
            state.error = null;
            state.expirationTime = null;
            localStorage.removeItem("token");
            localStorage.removeItem("expirationTime")
        },
        setErrorMessege(state, action) {
            state.error = action.payload;
        }
    }
});

export const authReducer = authSlice.reducer;
export const authAction = authSlice.actions;