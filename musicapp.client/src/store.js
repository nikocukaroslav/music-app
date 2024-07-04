import {configureStore} from "@reduxjs/toolkit";
import menuReducer from "@/features/menu/menuSlice.js";
import musicReducer from "@/features/music/musicSlice.js";
import albumReducer from "@/features/album/albumSlice.js";
import settingsReducer from "@/features/settings/settingsSlice.js";

export const store = configureStore({
    reducer: {
        menu: menuReducer,
        music: musicReducer,
        album: albumReducer,
        settings: settingsReducer,
    },
})