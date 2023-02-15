import { createSlice } from "@reduxjs/toolkit";

interface IReduxAdminActionPayloadTypes {
    email: string;
    username: string;
    password: string;
    error: string,
}

interface IReduxAdminStateType {
    email: string;
    username: string;
    password: string;
    isSuccessfullySignedIn: boolean;
    isAsyncSigningIn: boolean; // is the admin now/currently asynchronously signing in and consuming the back-end api
    error: string,
}

// a slice is an object that has a name, initialState, and reducers functions.
// name is important later on for using the useSelector hook
// initialState is somehow the structure/schema for this slice/model
// a reducer is a function that takes as parameters
// the current state and an action that has new values/payload
// to assign to the current state, and then return it.


// reducers functions can't be asynchronous
// thus we need to create another redux api helper file
// that will have async functions and dispatch these reducers here
// to update the values

const adminSlice = createSlice({
    name: "admin", 
    initialState: {
        email: "",
        username: "",
        password: "",
        isSuccessfullySignedIn: false,
        isAsyncSigningIn: false,
        error: "",
    } as IReduxAdminStateType,
    reducers: {
        // start signing in asynchronous
        signIn: (state) => {
            state.isAsyncSigningIn = true;
        },
        // admin has successfully signed in
        signInSucceeded: (
            state,
            action: { payload: IReduxAdminActionPayloadTypes }
        ) => {
            state.isAsyncSigningIn = false;
            state.isSuccessfullySignedIn = true;
            state.email = action.payload.email;
            state.username = action.payload.username;
            state.password = action.payload.password;
        },
        // error occurred
        signInFailed: (state,
            action: { payload: IReduxAdminActionPayloadTypes }
            ) => {
            state.isAsyncSigningIn = false;
            state.error = action.payload.error;
        },
    },
});

export default adminSlice.reducer;
export const { signIn, signInSucceeded, signInFailed } = adminSlice.actions;
export type { IReduxAdminActionPayloadTypes, IReduxAdminStateType };
