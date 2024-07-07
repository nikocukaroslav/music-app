import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {deleteMusic, getMusic, uploadMusic} from "@/services/apiMusicApp.js";
import {removeFromAlbum} from "@/features/album/albumSlice.js";

export const fetchMusic = createAsyncThunk(
    "music/fetchMusic", async (_, {getState}) => {
        const userId = getState().authorization.userId;
        return await getMusic(userId);
    }
)

export const fetchAllMusic = createAsyncThunk(
    "music/fetchAllMusic", async (_, {getState}) => {
        const userId = getState().authorization.userId;
        return await getMusic(userId);
    }
)

export const loadMusic = createAsyncThunk(
    "music/loadMusic", async ({e, userId}, {dispatch}) => {
        const response = await uploadMusic(e, userId);
        dispatch(fetchMusic());
        return response;
    }
)

export const removeMusic = createAsyncThunk(
    "music/removeMusic", async (id, {dispatch, getState}) => {
        const activeAlbum = getState().album.activeAlbum;

        await deleteMusic(id);

        if (activeAlbum)
            dispatch(removeFromAlbum(id));
        else
            dispatch(fetchMusic());
    }
)

export const initialState = {
    allMusic: [],
    music: [],
    loop: false,
    shuffle: false,
    musicName: "",
    musicUrl: "",
    musicId: "",
    isLoading: false,
    copied: false,
    selectMode: false,
    selectedMusic: [],
}

const musicSlice = createSlice({
    name: "music",
    initialState,
    reducers: {
        setMusic(state, action) {
            state.music = action.payload;
        },
        addToSelected(state, action) {
            state.selectedMusic.push(action.payload);
        },
        removeFromSelected(state, action) {
            state.selectedMusic = state.selectedMusic.filter(id => id !== action.payload)
        },
        cleanSelected(state) {
            state.selectedMusic = [];
        },
        copyToClipboard(state) {
            state.copied = !state.copied
        },
        toggleSelectMode(state) {
            state.selectMode = !state.selectMode
        },
        resetSelectMode(state) {
            state.selectMode = false;
        },
        setActiveMusic(state, action) {
            state.musicUrl = action.payload;
        },
        setActiveMusicId(state, action) {
            state.musicId = action.payload;
        },
        setActiveMusicName(state, action) {
            state.musicName = action.payload;
        },
        loopMusic(state) {
            state.loop = !state.loop;
            state.shuffle = false;
        },
        setShuffled(state) {
            state.shuffle = !state.shuffle;
            state.loop = false;
        },
        shuffleMusic(state) {
            if (state.music.length === 0) return;
            const randomIndex = Math.floor(Math.random() * state.music.length);
            state.musicUrl = state.music[randomIndex].url;
            state.musicId = state.music[randomIndex].id;
            state.musicName = state.music[randomIndex].name;
        },
        playNextSong(state) {
            if (state.music.length === 0) return;
            const currentIndex = state.music.findIndex(song => song.id === state.musicId);
            const nextIndex = (currentIndex + 1) % state.music.length;
            state.musicUrl = state.music[nextIndex].url;
            state.musicId = state.music[nextIndex].id;
            state.musicName = state.music[nextIndex].name;
        },
        playPreviousSong(state) {
            if (state.music.length === 0) return;
            const currentIndex = state.music.findIndex(song => song.id === state.musicId);
            const previousIndex = ((currentIndex - 1) + state.music.length) % state.music.length;
            state.musicUrl = state.music[previousIndex].url;
            state.musicId = state.music[previousIndex].id;
            state.musicName = state.music[previousIndex].name;
        },
        playFirstSong(state) {
            if (state.music.length === 0) return;
            state.musicUrl = state.music[0].url;
            state.musicId = state.music[0].id;
            state.musicName = state.music[0].name;
        },
        replaySong(state) {
            state.musicUrl
            state.musicId
            state.musicName
            state.loop
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchMusic.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchMusic.fulfilled, (state, action) => {
            state.isLoading = false;
            state.music = action.payload;
        });
        builder.addCase(fetchAllMusic.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchAllMusic.fulfilled, (state, action) => {
            state.isLoading = false;
            state.allMusic = action.payload;
        });
        builder.addCase(loadMusic.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(loadMusic.fulfilled, (state, action) => {
            state.music.push(action.payload);
            state.isLoading = false;
        });
        builder.addCase(removeMusic.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(removeMusic.fulfilled, (state, action) => {
            state.music = state.music.filter(song => song.id !== action.payload);
            state.isLoading = false;
        });
    }
})

export const {
    setActiveMusic,
    loopMusic,
    setActiveMusicName,
    playNextSong,
    playPreviousSong,
    setActiveMusicId,
    shuffleMusic,
    setShuffled,
    copyToClipboard,
    toggleSelectMode,
    resetSelectMode,
    addToSelected,
    removeFromSelected,
    cleanSelected,
    replaySong,
    setMusic,
    playFirstSong
} = musicSlice.actions;

export default musicSlice.reducer;