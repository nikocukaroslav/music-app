import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  showJumpControls: false,
  language: localStorage.getItem("language") || "en",
  theme: localStorage.getItem("theme") || "light",
  isLoading: false,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setIsLoadingSettings(state, action) {
      state.isLoading = action.payload;
    },
    toggleJumpControls(state) {
      state.showJumpControls = !state.showJumpControls;
    },
    changeLanguage(state, action) {
      state.language = action.payload;
      localStorage.setItem("language", action.payload);
    },
    changeTheme(state, action) {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload);
    },
  },
});

export const {
  toggleJumpControls,
  changeLanguage,
  setIsLoadingSettings,
  changeTheme,
} = settingsSlice.actions;

export default settingsSlice.reducer;
