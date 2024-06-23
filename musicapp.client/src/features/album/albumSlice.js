import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    albums: [],
    isCreateAlbumFormActive: false,
}

const albumSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        createAlbum(state, action) {
            state.albums.push(action.payload)
        },
        toggleCreateAlbumForm(state) {
            state.isCreateAlbumFormActive = !state.isCreateAlbumFormActive
        }
    }
})

export const {createAlbum, toggleCreateAlbumForm} = albumSlice.actions;

export default albumSlice.reducer;