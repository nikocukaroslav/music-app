import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {addAlbum, deleteAlbum, editAlbum, getAlbums,} from "@/services/apiMusicApp.js";
import {fetchMusic, playFirstSong, setMusic,} from "@/features/music/musicSlice.js";

const initialState = {
    isLoading: false,
    albums: [],
    musicList: [],
    isCreateAlbumFormActive: false,
    isAddMusicFormActive: false,
    activeAlbum: null,
    isMusicInList: null,
};

export const fetchAlbums = createAsyncThunk(
    "album/fetchAlbums",
    async (_, {getState}) => {
        const state = getState();
        const userId = state.authorization.userId;

        return await getAlbums(userId);
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
        const music = getState().music.allMusic;

        const filteredMusic = music.filter((song) =>
            album.musicList.includes(song.id)
        );

        dispatch(setActiveAlbum(album));
        dispatch(setMusic(filteredMusic));
        dispatch(playFirstSong());
    }
);

export const removeAlbum = createAsyncThunk(
    "album/removeAlbum",
    async (album, {dispatch}) => {
        await deleteAlbum(album.id);
        dispatch(fetchAlbums());
    }
);

export const removeFromAlbum = createAsyncThunk(
    "album/removeFromAlbum",
    async (selectedMusic, {dispatch, getState}) => {
        const state = getState();
        const music = state.music.music;

        const updatedMusicList = state.album.activeAlbum.musicList.filter(
            (song) => !selectedMusic.includes(song));

        const albumToUpdate = {
            ...state.album.activeAlbum,
            musicList: updatedMusicList,
        };

        const filteredMusic = music.filter((song) =>
            albumToUpdate.musicList.includes(song.id)
        );

        await editAlbum(albumToUpdate);

        dispatch(setActiveAlbum(albumToUpdate));
        dispatch(setMusic(filteredMusic));
    }
);

export const updateAlbum = createAsyncThunk(
    "album/updateAlbum",
    async (selectedMusic, {dispatch, getState}) => {
        await dispatch(fetchMusic())
        const state = getState();
        const music = state.music.music;

        const musicList = state.album.activeAlbum.musicList

        const updatedMusicList = [...musicList, ...selectedMusic];

        const albumToUpdate = {
            ...state.album.activeAlbum,
            musicList: updatedMusicList,
        };

        const filteredMusic = music.filter(song =>
            albumToUpdate.musicList.includes(song.id)
        );

        await editAlbum(albumToUpdate);

        dispatch(setActiveAlbum(albumToUpdate));
        dispatch(setMusic(filteredMusic));
    }
);


const albumSlice = createSlice({
    name: "album",
    initialState,
    reducers: {
        handleIsMusicInList(state, action) {
            state.isMusicInList = action.payload
        },
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
        toggleAddMusicForm(state) {
            state.isAddMusicFormActive = !state.isAddMusicFormActive;

        },
    },
    extraReducers: (builder) => {
        builder.addCase(createAlbum.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(createAlbum.fulfilled, (state) => {
            state.isLoading = false;
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
        builder.addCase(removeFromAlbum.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(removeFromAlbum.fulfilled, (state) => {
            state.isLoading = false
        });
        builder.addCase(updateAlbum.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateAlbum.fulfilled, (state) => {
            state.isLoading = false;
        })
    },
});

export const {
    toggleCreateAlbumForm,
    addToMusicList,
    removeFromMusicList,
    setActiveAlbum,
    toggleAddMusicForm,
    handleIsMusicInList
} = albumSlice.actions;

export default albumSlice.reducer;
