import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    menuIsActive: true,
}

const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        toggleMenu(state) {
            state.menuIsActive = !state.menuIsActive;
        },
    }
})

export const {toggleMenu} = menuSlice.actions;

export default menuSlice.reducer;