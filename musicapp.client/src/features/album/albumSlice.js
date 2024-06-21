import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    albums: []
}

const albumSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        addAlbum(state, action) {
            state.albums.push(action.payload)
        },
    }
})

export const {addAlbum} = albumSlice.actions;

export default albumSlice.reducer;