import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {deleteMusic, getMusic, uploadMusic} from "@/services/apiMusicApp.js";

export const fetchMusic = createAsyncThunk(
    "music/fetchMusic", async () => {
        return await getMusic();
    }
)

export const loadMusic = createAsyncThunk(
    "music/loadMusic", async (e, {dispatch}) => {
        const response = await uploadMusic(e);
        dispatch(fetchMusic());
        return response;
    }
)

export const removeMusic = createAsyncThunk(
    "music/removeMusic", async (id, {dispatch}) => {
        const response = await deleteMusic(id);
        dispatch(fetchMusic());
        return response;
    }
)

export const initialState = {
    music: [],
    loop: false,
    shuffle: false,
    musicName: "",
    musicUrl: "",
    musicId: "",
    isLoading: false,
    copied: false,
    selectMode: false,
    selectedMusic: []
}

const musicSlice = createSlice({
    name: "music",
    initialState,
    reducers: {
        addToSelected(state, action) {
            state.selectedMusic.push(action.payload);
        },
        copyToClipboard(state) {
            state.copied = !state.copied
        },
        setSelectMode(state) {
            state.selectMode = !state.selectMode
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
        }

    },
    extraReducers: builder => {
        builder.addCase(fetchMusic.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchMusic.fulfilled, (state, action) => {
            state.isLoading = false;
            state.music = action.payload;
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
    setSelectMode,
    addToSelected,
} = musicSlice.actions;

export default musicSlice.reducer;