import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {addAlbum, deleteAlbum, editAlbum, getAlbum, getAlbums,} from "@/services/apiMusicApp.js";
import {playFirstSong, setMusic,} from "@/features/music/musicSlice.js";

const initialState = {
    isLoading: false,
    albums: [],
    musicList: [],
    isCreateAlbumFormActive: false,
    activeAlbum: null,
};

export const fetchAlbums = createAsyncThunk("album/fetchAlbums", async () => {
    return await getAlbums();
});

export const createAlbum = createAsyncThunk(
    "album/createAlbum",
    async (album, {dispatch}) => {
        const response = await addAlbum(album);
        dispatch(fetchAlbums());
        return response;
    }
);

export const fetchAndFilterMusic = createAsyncThunk(
    "album/fetchAndFilterMusic",
    async (album, {dispatch, getState}) => {
        const music = getState().music.music;

        const currentAlbum = await getAlbum(album.id)

        const filteredMusic = music.filter((song) =>
            currentAlbum.musicList.includes(song.id)
        );

        dispatch(setActiveAlbum(currentAlbum));
        dispatch(setMusic(filteredMusic));
        dispatch(playFirstSong());
    }
);

export const removeAlbum = createAsyncThunk(
    "album/removeAlbum",
    async (id, {dispatch}) => {
        const response = await deleteAlbum(id);
        dispatch(fetchAlbums());
        return response;
    }
);

export const removeFromAlbum = createAsyncThunk(
    "album/removeFromAlbum",
    async (id, {dispatch, getState}) => {
        const state = getState();
        const music = state.music.music;

        const updatedMusicList = state.album.activeAlbum.musicList.filter(
            (song) => song !== id
        );

        const albumToUpdate = {
            ...state.album.activeAlbum,
            musicList: updatedMusicList,
        };

        const filteredMusic = music.filter((song) =>
            albumToUpdate.musicList.includes(song.id)
        );

        const response = await editAlbum(albumToUpdate);

        dispatch(setMusic(filteredMusic))
        dispatch(setActiveAlbum(albumToUpdate))

        return response;
    }
);

const albumSlice = createSlice({
    name: "album",
    initialState,
    reducers: {
        setActiveAlbum(state, action) {
            state.activeAlbum = action.payload;
        },
        addToMusicList(state, action) {
            state.musicList.push(action.payload);
        },
        removeFromMusicList(state, action) {
            state.musicList = state.musicList.filter(
                (song) => song.id !== action.payload
            );
        },
        toggleCreateAlbumForm(state) {
            state.isCreateAlbumFormActive = !state.isCreateAlbumFormActive;
        },
    },
    extraReducers: (builder) => {
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
        builder.addCase(removeAlbum.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(removeAlbum.fulfilled, (state, action) => {
            state.isLoading = false;
            state.albums = state.albums.filter(
                (album) => album.id !== action.payload
            );
        });
    },
});

export const {
    toggleCreateAlbumForm,
    addToMusicList,
    removeFromMusicList,
    setActiveAlbum,
} = albumSlice.actions;

export default albumSlice.reducer;
