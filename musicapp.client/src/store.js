import {configureStore} from "@reduxjs/toolkit";
import menuReducer from "@/features/menu/menuSlice.js";
import musicReducer from "@/features/music/musicSlice.js";

export const store = configureStore({
    reducer: {
        menu: menuReducer,
        music: musicReducer,
    },
})