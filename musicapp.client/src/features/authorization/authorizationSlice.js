import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    status: localStorage.getItem("status") || "unauthorized",
    login: localStorage.getItem("login") || "",
    isLoading: false,
    userId: localStorage.getItem("userId") || "",
}

const authorizationSlice = createSlice({
        name: "authorization",
        initialState,
        reducers: {
            setIsLoading(state, action) {
                state.isLoading = action.payload;
            },
            setUsername(state, action) {
                state.login = action.payload;
                localStorage.setItem("login", action.payload);
            },
            setUserId(state, action) {
                state.userId = action.payload;
                localStorage.setItem("userId", action.payload);
            },
            setStatus(state, action) {
                state.status = action.payload;
                localStorage.setItem("status", action.payload);
            },
            resetStatus(state) {
                state.status = "unauthorized";
                state.login = undefined;
                state.userId = undefined;
                localStorage.setItem("status", "unauthorized");
                localStorage.setItem("login", undefined);
                localStorage.setItem("userId", undefined);
            },
        }

    }
)

export const {setIsLoading, setUserId, setUsername, setStatus, resetStatus} = authorizationSlice.actions;

export default authorizationSlice.reducer;
