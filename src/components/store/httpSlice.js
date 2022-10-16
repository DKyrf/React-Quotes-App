import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quotes: [],
    error: null,
    status: "",
};

const httpSlice = createSlice({
    name: "http",
    initialState,
    reducers: {
        quotesSending(state) {
            state.status = "Pending...";
            state.quotes = [];
            state.error = null;
        },
        requestSucessfull(state, action) {
            state.quotes = action.payload;
            state.error = null;
            state.status = "Completed";
        },
        requestError(state, action) {
            state.error = action.payload;
            state.quotes = [];
            state.status = "Something went wrong";
        },


    }
});

export const httpReducer = httpSlice.reducer;
export const httpAction = httpSlice.actions;





// import { useReducer, useCallback } from 'react';

// function httpReducer(state, action) {
//   if (action.type === 'SEND') {
//     return {
//       quotes: null,
//       error: null,
//       status: 'pending',
//     };
//   }

//   if (action.type === 'SUCCESS') {
//     return {
//       quotes: action.responsequotes,
//       error: null,
//       status: 'completed',
//     };
//   }

//   if (action.type === 'ERROR') {
//     return {
//       quotes: null,
//       error: action.errorMessage,
//       status: 'completed',
//     };
//   }

//   return state;
// }

// function useHttp(requestFunction, startWithPending = false) {
//   const [httpState, dispatch] = useReducer(httpReducer, {
//     status: startWithPending ? 'pending' : null,
//     quotes: null,
//     error: null,
//   });

//   const sendRequest = useCallback(
//     async function (requestquotes) {
//       dispatch({ type: 'SEND' });
//       try {
//         const responsequotes = await requestFunction(requestquotes);
//         dispatch({ type: 'SUCCESS', responsequotes });
//       } catch (error) {
//         dispatch({
//           type: 'ERROR',
//           errorMessage: error.message || 'Something went wrong!',
//         });
//       }
//     },
//     [requestFunction]
//   );

//   return {
//     sendRequest,
//     ...httpState,
//   };
// }

// export default useHttp;