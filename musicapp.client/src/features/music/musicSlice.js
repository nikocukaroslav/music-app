import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    music: [],
    musicUrl: "",
}

const musicSlice = createSlice({
    name: "music",
    initialState,
    reducers: {
        setActiveMusic(state, action) {
            state.musicUrl = action.payload;
        }
    }
})

export const {setActiveMusic} = musicSlice.actions;

export default musicSlice.reducer;