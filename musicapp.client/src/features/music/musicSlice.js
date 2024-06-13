import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getMusic} from "@/services/apiMusicApp.js";

export const fetchMusic = createAsyncThunk(
    "music/fetchMusic", async () => {
        return await getMusic();
    }
)

export const initialState = {
    music: [],
    loop: false,
    musicName: "",
    musicUrl: "",
    musicId: "",
}

const musicSlice = createSlice({
    name: "music",
    initialState,
    reducers: {
        setActiveMusic(state, action) {
            state.musicUrl = action.payload;
        },
        setActiveMusicId(state, action) {
            state.musicName = action.payload;
        },
        setActiveMusicName(state, action) {
            state.musicName = action.payload;
        },
        loopMusic(state) {
            state.loop = !state.loop;
        },
        playNextSong(state) {
            if (state.music.length === 0) return;
            const currentIndex = state.music.findIndex(song => song.id === state.musicId);
            const nextIndex = (currentIndex + 1) % state.music.length;
            state.musicUrl = state.music[nextIndex].url;
            state.musicId = state.music[nextIndex].id;
        },
        playPreviousSong(state) {
            if (state.music.length === 0) return;
            const currentIndex = state.music.findIndex(song => song.id === state.musicId);
            const previousIndex = ((currentIndex - 1) + state.music.length) % state.music.length;
            state.musicUrl = state.music[previousIndex].url;
            state.musicId = state.music[previousIndex].id;
        }

    },
    extraReducers: builder => {
        builder.addCase(fetchMusic.fulfilled, (state, action) => {
            state.music = action.payload;
            console.log(state.music)
        });
    }
})

export const {
    setActiveMusic,
    loopMusic,
    setActiveMusicName,
    playNextSong,
    playPreviousSong,
    setActiveMusicId
} = musicSlice.actions;

export default musicSlice.reducer;