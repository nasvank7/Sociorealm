import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ThemeState {
  mode: string; // "light" or "dark"
}

const initialState: ThemeState = {
  mode: "light", // Default theme mode
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<string>) => {
      state.mode = action.payload;
      localStorage.setItem("themeMode", action.payload);
    },
  },
});

export const { setMode } = themeSlice.actions;

export default themeSlice.reducer;
