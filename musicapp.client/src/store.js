import {configureStore} from "@reduxjs/toolkit";
import menuReducer from "@/features/menu/menuSlice.js";
import musicReducer from "@/features/music/musicSlice.js";
import albumReducer from "@/features/album/albumSlice.js";

export const store = configureStore({
    reducer: {
        menu: menuReducer,
        music: musicReducer,
        album: albumReducer,
    },
})