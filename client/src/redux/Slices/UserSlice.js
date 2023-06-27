import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    currentUser: null,
    error: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        startlogin: (state) => {
            state.isLoading = true
        },
        loginsuccess: (state, action) => {
            state.isLoading = false
            state.currentUser = action.payload
        },
        loginfail: (state) => {
            state.isLoading = false
            state.currentUser = null 
            state.error = true
        }
    }
})

export const {startlogin, loginsuccess, loginfail} = userSlice.actions;

export default userSlice.reducer;