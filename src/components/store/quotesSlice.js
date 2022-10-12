import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    quotesStore: [
        { id: "q1", author: "Dany", text: "Some dummy text here", },
        { id: "q2", author: "Daniel", text: "Any other text but it's also dummy", }
    ],
}

const quoteSlice = createSlice({
    name: "quotes",
    initialState,
    reducers: {
        addQuote(state, action) {
            state.quotesStore = [...state.quotesStore, action.payload]
        },
    }
})

export const quoteReducer = quoteSlice.reducer;
export const quoteAction = quoteSlice.actions;