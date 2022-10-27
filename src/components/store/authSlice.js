import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem("token"),
    isLoggedIn: !!localStorage.getItem("token"),
    error: null,
    expirationTime: localStorage.getItem("expirationTime"),
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
        },
        calculateLogOutTime(state, action) {
            const currentTime = new Date().getTime();
            const adjExpirationTime = new Date(action.payload).getTime();

            const remeinigTime = adjExpirationTime - currentTime;
            console.log(remeinigTime);

            localStorage.setItem("expirationTime", remeinigTime);
            state.expirationTime = remeinigTime;

        },
    }
});

export const authReducer = authSlice.reducer;
export const authAction = authSlice.actions;