import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quotes: null,
    comments: null,
    error: null,
    status: "",
};

const httpSlice = createSlice({
    name: "http",
    initialState,
    reducers: {
        quotesSending(state) {
            state.status = "Pending...";
            state.comments = null;
            state.quotes = null;
            state.error = null;
        },
        requestSucessfull(state, action) {
            state.quotes = action.payload;
            state.error = null;
            state.status = "Completed";

            console.log(state.quotes)
        },
        requestError(state, action) {
            state.error = action.payload;
            state.quotes = null;
            state.comments = null;
            state.status = "Something went wrong";
        },
        commentsSending(state, action) {
            state.comments = action.payload;
            state.error = null;
            state.status = null;
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