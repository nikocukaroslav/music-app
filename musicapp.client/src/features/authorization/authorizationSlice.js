import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {loginUser} from "@/services/apiMusicApp.js";

const initialState = {
    status: localStorage.getItem("status") || "",
    isLoading: false,
}

export const setStatus = createAsyncThunk(
    "authorization/setStatus",
    async (user) => {
        return await loginUser(user);
    }
)

const authorizationSlice = createSlice({
        name: "authorization",
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder.addCase(setStatus.pending, (state) => {
                state.isLoading = true;
            });
            builder.addCase(setStatus.fulfilled, (state, action) => {
                state.status = action.payload;
                state.isLoading = false;
            })
        }
    }
)

export const {} = authorizationSlice.actions;

export default authorizationSlice.reducer;
