import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {addAlbum, getAlbums} from "@/services/apiMusicApp.js";

const initialState = {
    isLoading: false,
    albums: [],
    musicList: [],
    isCreateAlbumFormActive: false,
    activeAlbum: null,
}

export const fetchAlbums = createAsyncThunk(
    "album/fetchAlbums", async () => {
        return await getAlbums();
    }
)

export const createAlbum = createAsyncThunk(
    "album/createAlbum", async (album, {dispatch}) => {
        const response = await addAlbum(album);
        dispatch(fetchAlbums());
        return response;
    }
)

const albumSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        setActiveAlbum(state, action) {
            state.activeAlbum = action.payload;
        },
        addToMusicList(state, action) {
            state.musicList.push(action.payload);
        },
        removeFromMusicList(state, action) {
            state.musicList = state.musicList.filter(song => song.id !== action.payload)
        },
        toggleCreateAlbumForm(state) {
            state.isCreateAlbumFormActive = !state.isCreateAlbumFormActive;
        }
    },
    extraReducers: builder => {
        builder.addCase(createAlbum.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(createAlbum.fulfilled, (state, action) => {
            state.isLoading = false;
            state.music = action.payload;
        });
        builder.addCase(fetchAlbums.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchAlbums.fulfilled, (state, action) => {
            state.isLoading = false;
            state.albums = action.payload;
        });
    }
})

export const {toggleCreateAlbumForm, addToMusicList, removeFromMusicList, setActiveAlbum} = albumSlice.actions;

export default albumSlice.reducer;