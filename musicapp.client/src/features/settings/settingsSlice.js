import {createSlice} from "@reduxjs/toolkit";


export const initialState = {
    showJumpControls: false,
    language: localStorage.getItem("language") || "eng",
}

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        toggleJumpControls(state) {
            state.showJumpControls = !state.showJumpControls;
        },
        changeLanguage(state, action) {
            state.language = action.payload;
            localStorage.setItem("language", action.payload);
        }
    }
})

export const {toggleJumpControls, changeLanguage} = settingsSlice.actions;

export default settingsSlice.reducer;